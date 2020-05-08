import {TestBed} from '@angular/core/testing';

import {PermissionService} from './permission.service';
import {ConfigService} from './config.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('PermissionService', () => {
    let service: PermissionService;
    const restapiUrl = 'non-existing-url';
    let configService: ConfigService;
    let userPerms: number[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(PermissionService);
        configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('restapiUrl').and.returnValue(restapiUrl);
        userPerms = [0, 1, 2, 3, 4];
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('one permission needed, and has it', () => {
        service.perms = {
            'test': {
                or: [0]
            }
        };

        const answer = service.canAccess('test', userPerms);
        expect(answer).toBeTrue();
    });

    it('one permission needed, and does not have it', () => {
        service.perms = {
            'test': {
                or: [12]
            }
        };
        const answer = service.canAccess('test', userPerms);
        expect(answer).toBeFalse();
    });

    it('two permissions needed, has both', () => {
        service.perms = {
            'test': {
                and: [1, 2]
            }
        };
        const answer = service.canAccess('test', userPerms);
        expect(answer).toBeTrue();
    });

    it('more permissions needed, does not have only one', () => {
        service.perms = {
            'test': {
                and: [1, 2, 3, 4, -1]
            }
        };
        const answer = service.canAccess('test', userPerms);
        expect(answer).toBeFalse();
    });

    it('can access with 5 different permissions, and has one', () => {
        service.perms = {
            'test': {
                or: [12, 22, 32, 4, -1]
            }
        };
        const answer = service.canAccess('test', userPerms);
        expect(answer).toBeTrue();
    });

    it('complex, can access', () => {
        service.perms = {
            'test': {
                or:
                [
                    {
                        and: [1, 5]
                    },
                    {
                        and: [9, 0]
                    },
                    {
                        or: [19, -8]
                    },
                    {
                        and:
                        [
                            {
                                or: [0, 149]
                            },
                            {
                                and: [1, 2]
                            },
                            {
                                or: [2, -5]
                            }
                        ]
                    }
                ]
            }
        };
        const answer = service.canAccess('test', userPerms);
        expect(answer).toBeTrue();
    });

    it('complex, cant access', () => {
        service.perms = {
            'test': {
                or:
                    [
                        {
                            and: [1, 5]
                        },
                        {
                            and: [9, 0]
                        },
                        {
                            or: [19, -8]
                        },
                        {
                            and:
                                [
                                    {
                                        or: [0, 149]
                                    },
                                    {
                                        and: [1, 2]
                                    },
                                    {
                                        or: [-7, -5]
                                    }
                                ]
                        }
                    ]
            }
        };
        const answer = service.canAccess('test', userPerms);
        expect(answer).toBeFalse();
    });

    it('async functions should call the right api', () => {
        const http = TestBed.inject(HttpTestingController);
        const functionsToCall = [
            () => service.getAllPermissions(),
            () => service.savePermissions({add: [], delete: []})
        ];
        functionsToCall.forEach(item => item());
        const sent = http.match((req): boolean => {
            return req.url.includes(restapiUrl + '/public/') && req.url.toLowerCase().includes('permission');
        });
        expect(sent.length).toEqual(functionsToCall.length);
    });
});
