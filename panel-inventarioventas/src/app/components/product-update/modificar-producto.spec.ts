import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProducto } from './modificar-producto';

describe('ModificarProducto', () => {
  let component: ModificarProducto;
  let fixture: ComponentFixture<ModificarProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
