/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JWT } from '../models/JWT';
import type { Login } from '../models/Login';
import type { PatchedUserDetails } from '../models/PatchedUserDetails';
import type { Register } from '../models/Register';
import type { RestAuthDetail } from '../models/RestAuthDetail';
import type { SocialLogin } from '../models/SocialLogin';
import type { TokenRefresh } from '../models/TokenRefresh';
import type { TokenVerify } from '../models/TokenVerify';
import type { UserDetails } from '../models/UserDetails';
import type { VerifyEmail } from '../models/VerifyEmail';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ApiService {

    /**
     * class used for social authentications
     * example usage for facebook with access_token
     * -------------
     * from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
     *
     * class FacebookLogin(SocialLoginView):
     * adapter_class = FacebookOAuth2Adapter
     * -------------
     *
     * example usage for facebook with code
     *
     * -------------
     * from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
     * from allauth.socialaccount.providers.oauth2.client import OAuth2Client
     *
     * class FacebookLogin(SocialLoginView):
     * adapter_class = FacebookOAuth2Adapter
     * client_class = OAuth2Client
     * callback_url = 'localhost:8000'
     * -------------
     * @returns SocialLogin
     * @throws ApiError
     */
    public static apiAuthGoogleCreate({
        requestBody,
    }: {
        requestBody?: SocialLogin,
    }): CancelablePromise<SocialLogin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/google/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Check the credentials and return the REST Token
     * if the credentials are valid and authenticated.
     * Calls Django Auth login method to register User ID
     * in Django session framework
     *
     * Accept the following POST parameters: username, password
     * Return the REST Framework Token Object's key.
     * @returns JWT
     * @throws ApiError
     */
    public static apiAuthLoginCreate({
        requestBody,
    }: {
        requestBody: Login,
    }): CancelablePromise<JWT> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Calls Django logout method and delete the Token object
     * assigned to the current User object.
     *
     * Accepts/Returns nothing.
     * @returns RestAuthDetail
     * @throws ApiError
     */
    public static apiAuthLogoutCreate(): CancelablePromise<RestAuthDetail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout/',
        });
    }

    /**
     * @returns JWT
     * @throws ApiError
     */
    public static apiAuthRegisterCreate({
        requestBody,
    }: {
        requestBody: Register,
    }): CancelablePromise<JWT> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns RestAuthDetail
     * @throws ApiError
     */
    public static apiAuthRegisterVerifyEmailCreate({
        requestBody,
    }: {
        requestBody: VerifyEmail,
    }): CancelablePromise<RestAuthDetail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register/verify-email',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     * @returns TokenRefresh
     * @throws ApiError
     */
    public static apiAuthTokenRefreshCreate({
        requestBody,
    }: {
        requestBody: TokenRefresh,
    }): CancelablePromise<TokenRefresh> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/token/refresh/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Takes a token and indicates if it is valid.  This view provides no
     * information about a token's fitness for a particular use.
     * @returns TokenVerify
     * @throws ApiError
     */
    public static apiAuthTokenVerifyCreate({
        requestBody,
    }: {
        requestBody: TokenVerify,
    }): CancelablePromise<TokenVerify> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/token/verify/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     *
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     *
     * Returns UserModel fields.
     * @returns UserDetails
     * @throws ApiError
     */
    public static apiAuthUserRetrieve(): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/user/',
        });
    }

    /**
     * Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     *
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     *
     * Returns UserModel fields.
     * @returns UserDetails
     * @throws ApiError
     */
    public static apiAuthUserUpdate({
        requestBody,
    }: {
        requestBody: UserDetails,
    }): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/auth/user/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     *
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     *
     * Returns UserModel fields.
     * @returns UserDetails
     * @throws ApiError
     */
    public static apiAuthUserPartialUpdate({
        requestBody,
    }: {
        requestBody?: PatchedUserDetails,
    }): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/auth/user/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * OpenApi3 schema for this API. Format can be selected via content negotiation.
     *
     * - YAML: application/vnd.oai.openapi
     * - JSON: application/vnd.oai.openapi+json
     * @returns any
     * @throws ApiError
     */
    public static apiSchemaRetrieve({
        format,
        lang,
    }: {
        format?: 'json' | 'yaml',
        lang?: 'af' | 'ar' | 'ar-dz' | 'ast' | 'az' | 'be' | 'bg' | 'bn' | 'br' | 'bs' | 'ca' | 'ckb' | 'cs' | 'cy' | 'da' | 'de' | 'dsb' | 'el' | 'en' | 'en-au' | 'en-gb' | 'eo' | 'es' | 'es-ar' | 'es-co' | 'es-mx' | 'es-ni' | 'es-ve' | 'et' | 'eu' | 'fa' | 'fi' | 'fr' | 'fy' | 'ga' | 'gd' | 'gl' | 'he' | 'hi' | 'hr' | 'hsb' | 'hu' | 'hy' | 'ia' | 'id' | 'ig' | 'io' | 'is' | 'it' | 'ja' | 'ka' | 'kab' | 'kk' | 'km' | 'kn' | 'ko' | 'ky' | 'lb' | 'lt' | 'lv' | 'mk' | 'ml' | 'mn' | 'mr' | 'ms' | 'my' | 'nb' | 'ne' | 'nl' | 'nn' | 'os' | 'pa' | 'pl' | 'pt' | 'pt-br' | 'ro' | 'ru' | 'sk' | 'sl' | 'sq' | 'sr' | 'sr-latn' | 'sv' | 'sw' | 'ta' | 'te' | 'tg' | 'th' | 'tk' | 'tr' | 'tt' | 'udm' | 'ug' | 'uk' | 'ur' | 'uz' | 'vi' | 'zh-hans' | 'zh-hant',
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schema/',
            query: {
                'format': format,
                'lang': lang,
            },
        });
    }

}
