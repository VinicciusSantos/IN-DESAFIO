import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDrawerComponent } from './pokemon-drawer.component';

describe('PokemonDrawerComponent', () => {
  let component: PokemonDrawerComponent;
  let fixture: ComponentFixture<PokemonDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
