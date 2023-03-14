import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentsEntity } from '../entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentsEntity)
    private contentRepository: Repository<ContentsEntity>,
  ) {}

  async getInfo(): Promise<ContentsEntity[]> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webdriver = require('selenium-webdriver');
    const capabilities = webdriver.Capabilities.chrome();
    const driver = new webdriver.Builder()
      .withCapabilities(capabilities)
      .build();
    console.log('currentLink');
    try {
      driver.get('https://rikkei.vn/');
      driver
        .findElement({
          xpath: '/html/body/div[1]/div/section/div/div/p/a',
        })
        .click();
      setTimeout(() => {
        const email = driver.findElement(webdriver.By.css('#identifierId'));
        email.sendKeys('truongnx3@rikkeisoft.com');
      }, 5000);

      setTimeout(() => {
        const submit = driver.findElement(
          webdriver.By.xpath("//*[@id='identifierNext']/div/button"),
        );
        submit.click();
      }, 5000);

      setTimeout(() => {
        const password = driver.findElement(
          webdriver.By.css('[name=password]'),
        );
        password.sendKeys('truong13112000');
      }, 10000);

      setTimeout(() => {
        const submit2 = driver.findElement(
          webdriver.By.xpath("//*[@id='passwordNext']/div/button"),
        );
        submit2.click();
      }, 10000);

      setTimeout(async () => {
        const titles = await driver.findElements(
          webdriver.By.xpath('//*[@class="home-latest-news-content"]/div'),
        );
        console.log(titles.length);
        for (let i = 1; i <= titles.length; i++) {
          const info = new ContentsEntity();
          info.title = await driver
            .findElement(
              webdriver.By.xpath(
                `//*[@id="homeWrapper"]/section/div/div/div[1]/div/div/div[1]/div[2]/div[${i}]/div[2]/div[1]/h4/a`,
              ),
            )
            .getText();
          console.log(info.title);
          info.content = await driver
            .findElement(
              webdriver.By.xpath(
                `//*[@id="homeWrapper"]/section/div/div/div[1]/div/div/div[1]/div[2]/div[${i}]/div[2]/div[2]/div`,
              ),
            )
            .getText();
          info.imageLink = await driver
            .findElement(
              webdriver.By.xpath(
                `//*[@id="homeWrapper"]/section/div/div/div[1]/div/div/div[1]/div[2]/div[${i}]/div[1]/div/a/img[1]`,
              ),
            )
            .getAttribute('src');
          const data = this.contentRepository.create(info);
          this.contentRepository.save(data);
        }
      }, 12000);
    } catch (e) {
      console.log(e);
    }
    return await this.contentRepository.find();
  }
}
