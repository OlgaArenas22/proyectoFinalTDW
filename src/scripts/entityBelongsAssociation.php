<?php

/**
 * src/scripts/entityBelongsAssociation.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    https://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

use Doctrine\ORM\EntityManager;
use TDW\ACiencia\Entity\{ Association, Entity };
use TDW\ACiencia\Utility\DoctrineConnector;

require __DIR__ . '/inicio.php';

if (3 !== $argc) {
    $fich = basename(__FILE__);
    echo <<< MARCA_FIN

Usage: $fich <associationId> <entityId>
 
MARCA_FIN;
    exit(0);
}

$associationId = (int) $argv[1];
$entityId = (int) $argv[2];

try {
    /** @var EntityManager $entityManager */
    $entityManager = DoctrineConnector::getEntityManager();
    /** @var Entity|null $entity */
    $entity = $entityManager->find(Entity::class, $entityId);
    if (!$entity instanceof Entity) {
        throw new Exception("Person $entityId not exist" . PHP_EOL);
    }
    /** @var Association|null $association */
    $association = $entityManager->find(Association::class, $associationId);
    if (!$association instanceof Association) {
        throw new Exception("Association $associationId not exist" . PHP_EOL);
    }

    $entity->addAssociation($association);
    $entityManager->flush();
    $entityManager->close();
    echo 'Entity ID=' . $entity->getId() . ': added association ' . $associationId . PHP_EOL;
} catch (Throwable $e) {
    exit('ERROR (' . $e->getCode() . '): ' . $e->getMessage());
}
