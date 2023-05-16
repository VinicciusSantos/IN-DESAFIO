import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypeBadgeComponent } from './pokemon-type-badge.component';

describe('PokemonTypeBadgeComponent', () => {
  let component: PokemonTypeBadgeComponent;
  let fixture: ComponentFixture<PokemonTypeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonTypeBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonTypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
