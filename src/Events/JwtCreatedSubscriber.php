<?php 

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {
    public function updateJwtData(JWTCreatedEvent $event)
    {
        // 1 récupérer l'utilisateur (pour avoir son firstName et lastName)
        $user = $event->getUser();
        
        // 2 enrichir les datas pour qu'elles contiennent ces données
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();
        
        $event->setData($data);
        // dd($event->getData());
    }
}