<?php

namespace SoftUa\UserBundle\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use SoftUa\UserBundle\Entity\User;
use SoftUa\UserBundle\Entity\UserDataConfirmation;
use SoftUa\UserBundle\Exceptions\ConfirmationCompletedException;
use SoftUa\UserBundle\Exceptions\ConfirmationExpiredException;

/**
 * @extends ServiceEntityRepository<UserDataConfirmation>
 *
 * @method UserDataConfirmation|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserDataConfirmation|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserDataConfirmation[]    findAll()
 * @method UserDataConfirmation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserDataConfirmationRepository extends ServiceEntityRepository
{
    const CHANGE_EMAIL_WAITING_HOURS = 3;
    const CHANGE_PASSWORD_WAITING_HOURS = 3;

    public function __construct(
        ManagerRegistry $registry,
        private readonly UserRepository $userRepository,
    )
    {
        parent::__construct($registry, UserDataConfirmation::class);
    }

    public function createChangeEmailConfirmation(User $user, string $newEmail): UserDataConfirmation
    {
        $confirmation = new UserDataConfirmation();

        $confirmation
            ->setUser($user)
            ->setNewValue($newEmail)
            ->setDataType(UserDataConfirmation::DATA_TYPE_CHANGE_EMAIL)
            ->setCode($this->generateCode($user))
        ;

        $this->save($confirmation);

        return $confirmation;
    }

    public function applyChangeEmailConfirmation(UserDataConfirmation $confirmation): UserDataConfirmation
    {
        if ($confirmation->isCompleted()) {
            throw new ConfirmationCompletedException('Confirmation is completed');
        }

        $expirationDate = (new \DateTime())->modify(sprintf('-%d hours', self::CHANGE_EMAIL_WAITING_HOURS));

        if ($confirmation->getCreatedAt() < $expirationDate) {
            throw new ConfirmationExpiredException('Confirmation data is expired');
        }

        $user = $confirmation->getUser();
        $user->setEmail($confirmation->getNewValue());
        $this->userRepository->save($user);

        $confirmation->setIsCompleted(true);
        $this->save($confirmation);

        return $confirmation;
    }

    public function createChangePasswordConfirmation(User $user): UserDataConfirmation
    {
        $confirmation = new UserDataConfirmation();

        $confirmation
            ->setUser($user)
            ->setDataType(UserDataConfirmation::DATA_TYPE_CHANGE_PASSWORD)
            ->setCode($this->generateCode($user))
        ;

        $this->save($confirmation);

        return $confirmation;
    }

    public function applyChangePasswordConfirmation(UserDataConfirmation $confirmation): UserDataConfirmation
    {
        if ($confirmation->isCompleted()) {
            throw new ConfirmationCompletedException('Confirmation is completed');
        }

        if ($this->isChangePasswordConfirmationExpired($confirmation)) {
            throw new ConfirmationExpiredException('Confirmation data is expired');
        }

        $user = $confirmation->getUser();
        $user->setPassword($confirmation->getNewValue());

        $this->userRepository->save($user);
        $confirmation->setIsCompleted(true);
        $this->save($confirmation);

        return $confirmation;
    }

    public function isChangePasswordConfirmationExpired(UserDataConfirmation $confirmation): bool
    {
        $expirationDate = (new \DateTime())->modify(sprintf('-%d hours', self::CHANGE_PASSWORD_WAITING_HOURS));

        if ($confirmation->getCreatedAt() < $expirationDate) {
            return true;
        }

        return false;
    }

    public function getActiveByUserIdAndType(int $userId, string $type): ?UserDataConfirmation
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.user = :userId')
            ->andWhere('c.dataType = :type')
            ->andWhere('c.isCompleted = false')
            ->setParameter('userId', $userId)
            ->setParameter('type', $type)
            ->orderBy('c.id', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function getByUserIdAndCode(int $userId, string $code): ?UserDataConfirmation
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.user = :userId')
            ->andWhere('c.code = :code')
            ->setParameter('userId', $userId)
            ->setParameter('code', $code)
            ->orderBy('c.id', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function generatePublicKey(UserDataConfirmation $confirmation): string
    {
        return urlencode(
            base64_encode(
                sprintf('%d:%s', $confirmation->getUser()->getId(), $confirmation->getCode())
            )
        );
    }

    private function decodePublicKey(string $key): ?array
    {
        $key = base64_decode(urldecode($key), true);

        if (!$key) {
            return null;
        }

        $key = explode(':', $key);

        if (
            2 != count($key)
            || !is_numeric($key[0])
        ) {
            return null;
        }

        return [
            'userId' => (int)$key[0],
            'code' => (string)$key[1],
        ];
    }

    public function getByPublicKey(string $key): ?UserDataConfirmation
    {
        if(!$data = $this->decodePublicKey($key)) {
            return null;
        }

        return $this->getByUserIdAndCode($data['userId'], $data['code']);
    }

    public function save(UserDataConfirmation $entity)
    {
        $this->_em->persist($entity);
        $this->_em->flush();
    }

    private function generateCode(User $user): string
    {
        $code = sprintf('%d-%s', $user->getId(), uniqid());

        return strtoupper(hash('crc32', $code));
    }
}
