import { TestBed } from '@angular/core/testing';
import { Eraser } from 'src/app/object/tools/Eraser';

import { ToolService } from './tool.service';

describe('ToolServiceService', () => {
  let service: ToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`test change tool`, () => {
    service.changeTool('Eraser');
    expect(service.tool instanceof Eraser).toEqual(true);
  });
});
