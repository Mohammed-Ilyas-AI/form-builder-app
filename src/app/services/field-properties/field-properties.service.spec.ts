import { TestBed } from '@angular/core/testing';

import { FieldPropertiesService } from './field-properties.service';

describe('FieldPropertiesService', () => {
  let service: FieldPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
