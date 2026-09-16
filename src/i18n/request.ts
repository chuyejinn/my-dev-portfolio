import { getRequestConfig } from 'next-intl/server';
import ko from './messages/ko.json';

export default getRequestConfig(async () => {
  return {
    locale: 'ko',
    messages: ko,
  };
});
