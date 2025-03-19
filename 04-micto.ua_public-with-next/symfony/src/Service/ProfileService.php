<?php

namespace App\Service;

use App\Entity\UserProfile\DoctorProfile;
use App\Entity\UserProfile\UserProfileInterface;
use App\Repository\DoctorProfileRepository;
use SoftUa\UserBundle\Entity\User;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Bundle\SecurityBundle\Security;

class ProfileService
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly DoctorProfileRepository $doctorProfileRepository,
        private readonly Security $security,
    ){}

    public function saveUserData(User $user): void
    {
        $user = $data['user'] ?? null;
        if ($user instanceof User) {
            $this->userRepository->save($data['user']);
        }
    }

    public function saveDoctorData(User $user, DoctorProfile $doctorProfile): void
    {
        $doctorProfile->setUser($user);
        $this->doctorProfileRepository->save($doctorProfile);
    }

    public function getDoctorProfile(int $userId): ?UserProfileInterface
    {
        if (!$this->security->isGranted('ROLE_DOCTOR')) {
            return null;
        }

        return $this->doctorProfileRepository->getByUserId($userId);
    }

    // public function getPatientProfile, ...
}
