import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { testFontWeightResizer } from './testFontWeightResizer.component';
import { fontWeightResizerDirective } from '../../fontWeightResizer.directive';

describe('testFontWeightResizerDirective', () => {
  let fixture: ComponentFixture<testFontWeightResizer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testFontWeightResizer, fontWeightResizerDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(testFontWeightResizer);
    fixture.detectChanges();
  });

  it('should fontWeight to be bold', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const fontWeight = h2.style.fontWeight;

    expect(fontWeight).toEqual('bold');
  });
});
