<?php

/**
 * src/Controller/Association/AssociationRelationsController.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    https://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

namespace TDW\ACiencia\Controller\Association;

use Doctrine\ORM;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response;
use TDW\ACiencia\Controller\Element\ElementRelationsBaseController;
use TDW\ACiencia\Controller\Entity\EntityQueryController;
use TDW\ACiencia\Controller\Association\AssociationQueryController;
use TDW\ACiencia\Entity\Association;
use TDW\ACiencia\Factory\AssociationFactory;

/**
 * Class AssociationRelationsController
 */
final class AssociationRelationsController extends ElementRelationsBaseController
{
    public static function getEntityClassName(): string
    {
        return AssociationQueryController::getEntityClassName();
    }

    protected static function getFactoryClassName(): string
    {
        return AssociationFactory::class;
    }

    public static function getEntitiesTag(): string
    {
        return AssociationQueryController::getEntitiesTag();
    }

    public static function getEntityIdName(): string
    {
        return AssociationQueryController::getEntityIdName();
    }

    /**
     * Summary: GET /associations/{associationId}/entities
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     */
    public function getEntities(Request $request, Response $response, array $args): Response
    {
        /** @var Association|null $product */
        $association = $this->entityManager
            ->getRepository(AssociationQueryController::getEntityClassName())
            ->find($args[AssociationQueryController::getEntityIdName()]);

        $entities = $association?->getEntities() ?? [];

        return $this->getElements($response, $association, EntityQueryController::getEntitiesTag(), $entities);
    }

    /**
     * PUT /associations/{associationId}/entities/add/{stuffId}
     * PUT /associations/{associationId}/entities/rem/{stuffId}
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     * @throws ORM\Exception\ORMException
     */
    public function operationEntity(Request $request, Response $response, array $args): Response
    {
        return $this->operationRelatedElements(
            $request,
            $response,
            $args,
            EntityQueryController::getEntityClassName()
        );
    }
}
