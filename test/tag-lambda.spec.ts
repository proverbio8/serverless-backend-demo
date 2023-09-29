import { expect } from 'chai';
import { describe, it } from 'mocha';
import axios from 'axios';
const lambdaURL = 'http://localhost:3000/dev/tags/validate';

describe('Tag Validator Lambda function', () => {
  it('given an empty text returns invalid request', async () => {
    try {
      await axios.post(lambdaURL, { text: '' });
    } catch (error) {
      if (error.response) {
        expect(error.response.status).to.equal(400);
        expect(error.response.data.message).to.equal('text field is required');
      }
    }
  })

  it('given correctly tagged paragraph returns success message', async () => {
    const response = await axios.post(lambdaURL, { text: '<B>The following text<C>is centred and in boldface</C></B>' });
    expect(response.data).to.deep.equal({message: 'Correctly tagged paragraph'});
  });

  it('given closing tag where no opening tag exists returns expected message', async () => {
    const response = await axios.post(lambdaURL, { text: '<B>This should be in boldface, but there is an extra closing tag</B></C>' });
    expect(response.data).to.deep.equal({message: 'Expected # found </C>'});
  });

  it('given missing closing tag returns expected message', async () => {
    const response = await axios.post(lambdaURL, { text: '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>' });
    expect(response.data).to.deep.equal({message: 'Expected </B> found #'});
  });

  it('given wrongly nested tags returns expected message', async () => {
    const response = await axios.post(lambdaURL, { text: '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>' });
    expect(response.data).to.deep.equal({message: 'Expected </C> found </B>'});
  });

  it('given combination of multiple tags returns success message', async () => {
    const response = await axios.post(lambdaURL, { text: '<A><B><C>Combination of multiple tags</C></B></A>' });
    expect(response.data).to.deep.equal({message: 'Correctly tagged paragraph'});
  });

  it('given mismatched opening and closing tags returns expected message', async () => {
    const response = await axios.post(lambdaURL, { text: '<B>This should be in boldface, but the tags mismatch</C>' });
    expect(response.data).to.deep.equal({message: 'Expected </B> found </C>'});
  });
});
