import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsSectionComponent } from './pokemons-section.component';

describe('PokemonsSectionComponent', () => {
  let component: PokemonsSectionComponent;
  let fixture: ComponentFixture<PokemonsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
