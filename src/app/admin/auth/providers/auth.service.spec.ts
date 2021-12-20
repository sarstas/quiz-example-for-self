import { AuthService } from '@app/admin/auth/providers/auth.service';
import { TestBed } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should login', () => {

  });

});
