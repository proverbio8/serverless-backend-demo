import { expect } from 'chai';
import { describe, it } from 'mocha';
import { validateTags } from '@libs/tag';

describe('Tag validation tests', () => {
  it('given an empty text returns null', () => {
    expect(validateTags('')).to.equal(null);
  });
  it('given an plain text returns text with no tags message', () => {
    expect(validateTags('hello hello')).to.equal("This text doesn't have tags");
  });
  it('given unsupported tags returns invalid tags message', () => {
    expect(validateTags('hello <>')).to.equal("<> and </> are invalid tags");
    expect(validateTags('hello </>')).to.equal("<> and </> are invalid tags");
    expect(validateTags('<> hello </>')).to.equal("<> and </> are invalid tags");
  });
  it('given correctly tagged paragraph returns success message', () => {
    expect(validateTags('<B>The following text<C>is centred and in boldface</C></B>')).to.equal(
      'Correctly tagged paragraph',
    );
  });

  it('given closing tag where no opening tag exists returns expected message', () => {
    expect(
      validateTags('<B>This should be in boldface, but there is an extra closing tag</B></C>'),
    ).to.equal('Expected # found </C>');
  });

  it('given missing closing tag returns expected message', () => {
    expect(
      validateTags(
        '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>',
      ),
    ).to.equal('Expected </B> found #');
  });

  it('given wrongly nested tags returns expected message', () => {
    expect(
      validateTags(
        '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>',
      ),
    ).to.equal('Expected </C> found </B>');
    expect(
      validateTags(
        '<B><CENTER>This should be centred boldface, but the tags are wrongly nested</B></CENTER>',
      ),
    ).to.equal('Expected </CENTER> found </B>');
    expect(
      validateTags(
        '<html><p>This should be centred boldface, but the tags are wrongly nested</html></CENpTER>',
      ),
    ).to.equal('Expected </p> found </html>');
  });

  it('given combination of multiple tags returns success message', () => {
    expect(validateTags('<A><B><C>Combination of multiple tags</C></B></A>')).to.equal(
      'Correctly tagged paragraph',
    );
  });

  it('given mismatched opening and closing tags returns expected message', () => {
    expect(validateTags('<B>This should be in boldface, but the tags mismatch</C>')).to.equal(
      'Expected </B> found </C>',
    );
  });
});
