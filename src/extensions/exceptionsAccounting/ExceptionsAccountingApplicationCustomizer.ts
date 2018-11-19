import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { AppInsights } from 'applicationinsights-js';
export interface IExceptionsAccountingApplicationCustomizerProperties {
  testMessage: string;
}

export default class ExceptionsAccountingApplicationCustomizer
  extends BaseApplicationCustomizer<IExceptionsAccountingApplicationCustomizerProperties> {
  private instrumentationKey: string = 'f4b605a8-2345-45d3-81c4-a29ea025ea28';
  @override
  public onInit(): Promise<void> {
    AppInsights.downloadAndSetup({ instrumentationKey: this.instrumentationKey });
    AppInsights.trackPageView();
    setInterval(() => {
      try {
        throw new Error('Extension for "Application Insights"');
      } catch (error) {
        console.log(error);
        AppInsights.trackException(error);
      }
    }, 30000);


    return Promise.resolve();
  }
}
