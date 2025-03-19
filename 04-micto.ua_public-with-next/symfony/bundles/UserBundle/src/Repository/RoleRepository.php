<?php

namespace SoftUa\UserBundle\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use SoftUa\UserBundle\Entity\Role;

/**
 * @method Role|null find($id, $lockMode = null, $lockVersion = null)
 * @method Role|null findOneBy(array $criteria, array $orderBy = null)
 * @method Role[]    findAll()
 * @method Role[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RoleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Role::class);
    }

    public function getByCode(string $code): ?Role
    {
        if (!$code) {
            return null;
        }

        return $this->findOneBy([
            'code' => $code,
        ]);
    }

    public function save(Role $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);

        if ($flush) {
            $this->_em->flush();
        }
    }

    public function remove(Role $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);

        if ($flush) {
            $this->_em->flush();
        }
    }

    public function getCodeList(): array
    {
        $list = [
            Role::ROLE_SUPER_ADMIN,
        ];

        $dbRoles = $this->createQueryBuilder('r')
            ->select('r.code')
            ->getQuery()
            ->getSingleColumnResult();

        return array_values(array_unique(array_merge($list, $dbRoles)));
    }
}
