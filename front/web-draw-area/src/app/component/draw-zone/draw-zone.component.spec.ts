import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawZoneComponent } from './draw-zone.component';

describe('DrawZoneComponent', () => {
  let component: DrawZoneComponent;
  let fixture: ComponentFixture<DrawZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`test onClickDown`, () => {
    component.onClickDown();
    expect(component.mouse.click).toEqual(true);
  });

  it(`test onClickDown`, () => {
    component.onClickUp();
    expect(component.mouse.click).toEqual(false);
  });

  it('test resizeDrawZone', () => {
    component.resizeDrawZone(200, 200);
    expect(component.context.canvas.width).toEqual(200);
    expect(component.context.canvas.height).toEqual(200);
  })
});
