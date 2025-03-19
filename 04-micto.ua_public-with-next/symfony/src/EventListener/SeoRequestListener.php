<?php

namespace App\EventListener;

use App\Seo\SeoGenerator;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[AsEventListener(event: RequestEvent::class, method: 'onRequestEvent', priority: 10)]
final class SeoRequestListener
{
    public function __construct(
        private readonly SeoGenerator $seoGenerator,
        private readonly UrlGeneratorInterface $generator,
    ) {}

    public function onRequestEvent(RequestEvent $event)
    {
        $request = $event->getRequest();

        if (
            'GET' != $request->getMethod()
            || 'error_controller' == $request->get('_controller')
            || 'xml' == $request->get('_format')
            || !$event->isMainRequest()
        ) {
            return;
        }

        $route = $request->get('_route', 'home');
        $params = $request->get('_route_params', []);
        $params = array_merge($params, $request->query->all());

        $url = $this->generator->generate($route, $params, UrlGeneratorInterface::ABSOLUTE_URL);

        $this->seoGenerator->getOgSeoGenerator()
            ->setUrl($url)
            ->set('og:site_name', 'МІСТО.юа')
            ->set('og:locale', sprintf('%s_UA', $request->getLocale()))
        ;

        $this->seoGenerator->getBasicSeoGenerator()->setCanonical($url);
    }
}
