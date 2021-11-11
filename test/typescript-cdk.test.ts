import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as TypescriptCdk from '../lib/bucket-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new TypescriptCdk.TypescriptCdkStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT));
});
