import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesUpdate } from './sales-update';

describe('SalesUpdate', () => {
  let component: SalesUpdate;
  let fixture: ComponentFixture<SalesUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
