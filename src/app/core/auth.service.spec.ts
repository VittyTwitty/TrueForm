import { Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import {
    CookieOptions,
    CookieService,
    CookieModule
} from 'ngx-cookie/index';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
import {
    getTestBed,
    TestBed,
    async
} from '@angular/core/testing';
import {
    Http,
    ResponseOptions,
    Response,
    BaseRequestOptions,
    XHRBackend
} from '@angular/http';
import { ConfigService } from '../shared/services/config.service';

describe('Service: Auth', () => {
    let backend: MockBackend;
    let service: AuthService;
    let cookiesService: CookieService;
    let sessionService: SessionService;
    let testbed: Injector;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CookieModule.forRoot()
            ],
            providers: [
                BaseRequestOptions,
                MockBackend,
                ConfigService,
                SessionService,
                AuthService,
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    // tslint:disable-next-line:no-shadowed-variable
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ]
        });

        testbed = getTestBed();
        backend = testbed.get(MockBackend);
        service = testbed.get(AuthService);
        sessionService = testbed.get(SessionService);
        cookiesService = testbed.get(CookieService);
    }));

    afterEach(() => {
        cookiesService.removeAll();
        testbed = undefined;
        cookiesService = undefined;
        sessionService = undefined;
    });

    // tslint:disable-next-line:no-shadowed-variable
    function signInBackend(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
            if (connection.request.url === 'http://fe-kurs.light-it.net:38000/api/login/') {
                const responseOptions = new ResponseOptions(options);
                const response = new Response(responseOptions);
                connection.mockRespond(response);
            }
        });
    }

    describe('Featuere: loggedIn', () => {
        let loggedIn: boolean;
        describe('WHEN, token not exist', () => {
            beforeEach(() => {
                spyOnProperty(sessionService, 'sessionToken', 'get').and.returnValue(false);
                loggedIn = service.loggedIn();
            });
            it('THEN, METHOD return false', () => {
                expect(loggedIn).toBeFalsy();
            });
        });
        describe('WHEN, token exist', () => {
            beforeEach(() => {
                spyOnProperty(sessionService, 'sessionToken', 'get').and.returnValue('sessionToken');
                loggedIn = service.loggedIn();
            });
            it('THEN, method return true', () => {
                expect(loggedIn).toBeTruthy();
            });
        });
    });

    describe('Feature: login', () => {
        describe('WHEN, login successful', () => {
            it('WHEN, send the login request to the server', (done) => {
                let profileInfo = { email: 'testjassmine@gmail.com', password: 'qwertyuiopqw' };
                backend.connections.subscribe((connection: MockConnection) => {
                    let options = new ResponseOptions({ body: profileInfo });
                    connection.mockRespond(new Response(options));
                });
                service.login(profileInfo)
                    .subscribe((response) => {
                        expect(response).toHaveBeenCalled();
                    });
            });
        });
    });

});
