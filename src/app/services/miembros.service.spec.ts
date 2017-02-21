/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MiembrosService } from './miembros.service';

describe('MiembrosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiembrosService]
    });
  });

  it('should ...', inject([MiembrosService], (service: MiembrosService) => {
    expect(service).toBeTruthy();
  }));
});
