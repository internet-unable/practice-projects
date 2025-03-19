<?php

namespace App\Controller;

use App\Seo\SeoGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Add routes in config/routes/static_page.yaml
 */
class StaticPageController extends AbstractController
{
    public function __construct(
        private readonly SeoGenerator $seoGenerator,
    ) {}

    #[Route('/about/', 'about_page', options: ['sitemap' => ['priority' => 0.2]])]
    public function aboutPage(): Response
    {
        $this->seoGenerator
            ->setTitle('Про проект - Місто.юа')
            ->setDescription('Ми, команда проєкту Micto.ua. У 2014-ому році, у зв’язку з війною і появою переселенців в країні, до нас звернулось МОЗ України (Міністерство з Охорони Здоров’я України) з проханням розробити і впровадити інтернет-проект, який допоможе людям швидко і просто знайти медичний заклад на території України. При цьому міністерство не було готове виділити державні кошти на реалізацію даного проекту. Тому я, Дмитро Юрійович Асмагілов взяв ініціативу в свої руки і вклав власні сили в стартап "MICTO.UA", залучаючи співробітників компанії ТОВ "SOFT.UA" для реалізації та підтримки працездатності цього ресурсу. Після оголошення війни росією Україні 24 лютого 2022 року, відчуваємо, що подібний ресурс стане ще більш затребуваним, в звʼязку з величезною кількістю біженців. Багато медичних закладів зазнало бомбардувань та зруйновані, медичний персонал евакуйовано, про те вони можуть та надають медичну допомогу на нових місцях. Своєчасна інформація про розташування та працездатність того чи іншого медичного закладу, врятує не одне життя. Окрім цього, велика кількість людей в блокованих містах, через відсутність руху транспорту та закриття аптек, не мають доступ до необхідних для них ліків, що загрожує їх життю так само як і бомбардування. Ми відчуваємо необхідність в такий складний час, зробити все від нас залежне, щоб допомогти людям які шукають медичні заклади та потребують медичної допомоги. Особливу увагу ми надаємо підтримці дітям та людям літнього віку, які є найбільш вразливими верствами населення. Організовано гуманітарний штаб в Києві, в якому за рахунок внесків та пожертвувань закуповуються медикаменти, засоби гігієни. Співпрацюємо з іноземними фондами у допомозі по евакуації дітей за кордон(в першу чергу, це діти-сироти, які опинились в найскрутнішому становищі).')
            ->setKeywords('Про проект')
        ;

        return $this->render("/static/about.html.twig");
    }

    #[Route('/volunteering/', 'volunteer_page', options: ['sitemap' => ['priority' => 0.2]])]
    public function volunteerPage(): Response
    {
        $this->seoGenerator
            ->setTitle('Волонтерство - Місто.юа')
            ->setDescription('Волонтерство')
            ->setKeywords('Волонтерство, MICTO.UA, місто.юа, micto.ua, misto.ua')
        ;

        return $this->render("/static/volunteer.html.twig");
    }

    #[Route('/partners/', 'partners_page', options: ['sitemap' => ['priority' => 0.2]])]
    public function partnersPage(): Response
    {
        $this->seoGenerator
            ->setTitle('Партнери - Місто.юа')
            ->setDescription('Партнери')
            ->setKeywords('Партнери')
        ;

        return $this->render("/static/partners.html.twig");
    }

    #[Route('/sponsor/', 'sponsor_page', options: ['sitemap' => ['priority' => 0.2]])]
    public function sponsorPage(): Response
    {
        $this->seoGenerator
            ->setTitle('Спонсорам - Місто.юа')
            ->setDescription('Стати спонсором проекту')
            ->setKeywords('Спонсорам')
        ;

        return $this->render("/static/sponsor.html.twig");
    }

    #[Route('/donate/', 'donate_page', options: ['sitemap' => ['priority' => 0.2]])]
    public function donatePage(): Response
    {
        $this->seoGenerator
            ->setTitle('Спонсорська допомога - Місто.юа')
            ->setDescription('Спонсорська допомога')
            ->setKeywords('Спонсорська допомога, MICTO.UA, місто.юа, micto.ua, misto.ua')
        ;

        return $this->render("/static/donate.html.twig");
    }

    #[Route('/investor/', 'investor_page', options: ['sitemap' => ['priority' => 0.2]])]
    public function investorPage(): Response
    {
        $this->seoGenerator
            ->setTitle('Інвесторам - Місто.юа')
            ->setDescription('Я, Дмитро Асмагілов, хочу, щоб кожна людина на Землі змогла безпечно, швидко, якісно, доступно за ціною і місцем розташування, без всілякої дискримінації отримати в повному обсязі інформацію, послуги та товари в області здоров\'я.')
            ->setKeywords('Інвесторам')
        ;

        return $this->render("/static/investor.html.twig");
    }

    #[Route('/advertising/', 'advertising_page', options: ['sitemap' => ['priority' => 0.2]])]
    public function advertisingPage(): Response
    {
        $this->seoGenerator
            ->setTitle('Реклама - Місто.юа')
            ->setDescription('Реклама - Місто.юа')
            ->setKeywords('Реклама, MICTO.UA, місто.юа, micto.ua, misto.ua')
        ;

        return $this->render("/static/advertising.html.twig");
    }

    #[Route('/asmagilov/', 'psychologist_page', options: ['sitemap' => ['priority' => 0.2]])]
    public function psychologistPage(): Response
    {
        $this->seoGenerator
            ->setTitle('Професійний психолог у Києві')
            ->setDescription('Дмитро Юрійович Асмагілов, онлайн консультації по психології в м. Київ Практична психологія, бізнес психологія, психологія правди, диференціальна психологія. Психоаналітика.')
            ->setKeywords('Психолог, MICTO.UA, місто.юа, micto.ua, misto.ua')
        ;

        return $this->render("/static/psychologist.html.twig");
    }

    #[Route('/asmagilov/success', 'psychologist_success_page')]
    public function psychologistSuccessPage(): Response
    {
        return $this->render("/psychologist/psychologist_success.html.twig");
    }

//    #[Route('/doconline/', 'doc_online_page', options: ['sitemap' => ['priority' => 0.2]])]
//    public function docOnlinePage(): Response
//    {
//        $this->seoGenerator
//            ->setTitle('Лікарні онлайн - Місто.юа')
//            ->setDescription('Лікарні онлайн - MICTO.UA')
//            ->setKeywords('Лікарні онлайн, MICTO.UA, місто.юа, micto.ua, misto.ua')
//        ;
//
//        return $this->render("/static/doc_online.html.twig");
//    }

    #[Route('/privacypolicy/', 'privacy_policy_page')]
    public function privacyPolicyPage(): Response
    {
        $this->seoGenerator
            ->setTitle('Умовами збору, оброки та захисту персональних даних - Місто.юа')
            ->setDescription('Умовами збору, оброки та захисту персональних даних')
            ->setKeywords('Умовами збору, оброки та захисту персональних даних, MICTO.UA, місто.юа, micto.ua, misto.ua')
        ;

        return $this->render("/static/privacy_policy.html.twig");
    }

    #[Route('/successpage/', 'success_page')]
    public function successPage(): Response
    {
        $this->seoGenerator
            ->setTitle('Дякуємо за ваше повідомлення!');

        return $this->render("/components/success_page.html.twig");
    }
}
