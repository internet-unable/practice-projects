<?php

namespace SoftUa\UserBundle\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use SoftUa\UserBundle\Entity\RolePermission;
use SoftUa\UserBundle\Security\BundlePermissionsRepository;

/**
 * @method RolePermission|null find($id, $lockMode = null, $lockVersion = null)
 * @method RolePermission|null findOneBy(array $criteria, array $orderBy = null)
 * @method RolePermission[]    findAll()
 * @method RolePermission[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PermissionRepository extends ServiceEntityRepository
{
    public function __construct(
        ManagerRegistry $registry,
        private readonly BundlePermissionsRepository $bundlePermissionsRepository
    ) {
        parent::__construct($registry, RolePermission::class);
    }

    public function save(RolePermission $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);

        if ($flush) {
            $this->_em->flush();
        }
    }

    public function getList(): array
    {
        return $this->createQueryBuilder('rp')
            ->getQuery()
            ->getResult();
    }

    public function getListFromBundles(): array
    {
        return $this->bundlePermissionsRepository->getPermissions();
    }
}
