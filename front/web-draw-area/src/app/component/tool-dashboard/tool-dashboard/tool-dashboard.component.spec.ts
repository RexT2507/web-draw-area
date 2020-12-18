import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolDashboardComponent } from './tool-dashboard.component';

describe('ToolDashboardComponent', () => {
  let component: ToolDashboardComponent;
  let fixture: ComponentFixture<ToolDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`initialization with pencil`, () => {
    expect(component.activeTool).toEqual('Pencil');
  });

  it(`test change tool`, () => {
    component.changeTool('Eraser');
    expect(component.activeTool).toEqual('Eraser');
  });

});
