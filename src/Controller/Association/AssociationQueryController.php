<?php

/**
 * src/Controller/Product/ProductQueryController.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    https://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

namespace TDW\ACiencia\Controller\Association;

use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response;
use TDW\ACiencia\Controller\Element\ElementBaseQueryController;
use TDW\ACiencia\Entity\Association;

/**
 * Class AssociationQueryController
 */
class AssociationQueryController extends ElementBaseQueryController
{
    /** @var string ruta api gestión de asociaciones  */
    public const PATH_ASSOCIATIONS = '/associations';

    public static function getEntitiesTag(): string
    {
        return 'associations';
    }

    public static function getEntityClassName(): string
    {
        return Association::class;
    }

    public static function getEntityIdName(): string
    {
        return 'associationId';
    }

    /**
     * Summary: Returns status code 204 if associationName exists
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     */
    public function getAssociationName(Request $request, Response $response, array $args): Response
    {
        return $this->getElementByName($response, $args['associationName']);
    }
}
