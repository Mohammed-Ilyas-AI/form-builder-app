import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { FieldGroupService } from '../field-group/field-group.service';
import { FieldGroup } from '../../models/field-group';
import { BehaviorSubject } from 'rxjs';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let mockFieldGroupService: jasmine.SpyObj<FieldGroupService>;

  const mockGroups: FieldGroup[] = [
    {
      id: 1,
      name: 'Group 1',
      description: 'Desc',
      type: 'default',
    },
    { id: 2, name: 'Group 2', description: '', type: 'default' },
  ];

  beforeEach(() => {
    mockFieldGroupService = jasmine.createSpyObj('FieldGroupService', [
      'getFieldGroups',
      'updateFieldGroup',
      'addFieldGroup',
      'setFieldGroups',
    ]);

    mockFieldGroupService.getFieldGroups.and.returnValue(mockGroups);
    Object.defineProperty(mockFieldGroupService, 'fieldGroupsSubject', {
      value: new BehaviorSubject<FieldGroup[]>(mockGroups),
      writable: true,
    });
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        { provide: FieldGroupService, useValue: mockFieldGroupService },
      ],
    });

    service = TestBed.inject(LocalStorageService);
  });

  it('should set selected field group on init if available', (done) => {
    service.selectedFieldGroup$.subscribe((group) => {
      expect(group).toEqual(mockGroups[0]);
      done();
    });
  });

  it('should update selected field group', () => {
    const updatedGroup: FieldGroup = { ...mockGroups[0], name: 'Updated Name' };
    service.updateSelectedFieldGroup(updatedGroup);

    service.selectedFieldGroup$.subscribe((group) => {
      expect(group?.name).toBe('Updated Name');
    });
    expect(mockFieldGroupService.updateFieldGroup).toHaveBeenCalledWith(
      updatedGroup
    );
  });

  it('should copy selected field group', () => {
    service.setSelectedFieldGroup(mockGroups[0]);
    service.copySelectedFieldGroup();

    expect(mockFieldGroupService.addFieldGroup).toHaveBeenCalledWith(
      jasmine.stringMatching(/Group 1 \(Copy\)/),
      'Desc',
      'copied'
    );
  });

  it('should delete the selected field group and deselect it (set to null)', (done) => {
    const updatedGroups: FieldGroup[] = [];
    mockFieldGroupService.getFieldGroups.and.returnValue(updatedGroups);

    service.setSelectedFieldGroup(mockGroups[0]);
    service.deleteSelectedFieldGroup();

    service.selectedFieldGroup$.subscribe((group) => {
      expect(group).toBeNull();
      done();
    });
  });
});
