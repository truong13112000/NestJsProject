import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import console from 'console';
import { Repository } from 'typeorm';
import { ContentsEntity } from '../entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentsEntity)
    private contentRepository: Repository<ContentsEntity>,
  ) {}

  async getInfo1(driver) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webdriver = require('selenium-webdriver');
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      console.log('email');
      const email = driver.findElement({
        xpath: '//input[@name="identifier"]',
      });
      email.sendKeys('truongnx3@rikkeisoft.com');
      const submit = driver.findElement(
        webdriver.By.xpath("//div[@class='F9NWFb']/div/div/button"),
      );
      submit.click();
      setTimeout(() => {
        const password = driver.findElement({
          xpath: "//*[@id='password']/div[1]/div/div[1]/input",
        });
        password.sendKeys('truong13112000');
      }, 5000);

      setTimeout(() => {
        const submit2 = driver.findElement(
          webdriver.By.xpath("//*[@id='passwordNext']/div/button"),
        );
        submit2.click();
      }, 5000);
    } catch (error) {
      throw error;
    }
  }

  async getInfo(): Promise<ContentsEntity[]> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webdriver = require('selenium-webdriver');
    const capabilities = webdriver.Capabilities.chrome();
    const driver = new webdriver.Builder()
      .withCapabilities(capabilities)
      .build();
    try {
      driver.get('https://rikkei.vn/');
      driver
        .findElement({
          xpath: '/html/body/div[1]/div/section/div/div/p/a',
        })
        .click();

      setTimeout(() => {
        const email = driver.findElement({
          xpath: '//input[@id="identifierId"]',
        });
        email.sendKeys('truongnx3@rikkeisoft.com');
      }, 5000);

      setTimeout(() => {
        const submit = driver.findElement(
          webdriver.By.xpath("//*[@id='identifierNext']/div/button"),
        );
        submit.click();
      }, 5000);

      setTimeout(() => {
        const password = driver.findElement({
          xpath: "//*[@id='password']/div[1]/div/div[1]/input",
        });
        password.sendKeys('truong13112000');
      }, 15000);

      setTimeout(() => {
        const submit2 = driver.findElement(
          webdriver.By.xpath("//*[@id='passwordNext']/div/button"),
        );
        submit2.click();
      }, 15000);

      setTimeout(() => {
        const titles = driver.findElements(
          webdriver.By.xpath(
            '//*[@class="home-latest-news-item news-item row"]/div',
          ),
        );
        for (let i = 1; i <= titles.length; i++) {
          const info = new ContentsEntity();
          info.title = driver
            .findElement(
              webdriver.By.xpath(
                `//*[@id="homeWrapper"]/section/div/div/div[1]/div/div/div[1]/div[2]/div[${i}]/div[2]/div[1]/h4/a`,
              ),
            )
            .getText();
          info.content = driver
            .findElement(
              webdriver.By.xpath(
                `//*[@id="homeWrapper"]/section/div/div/div[1]/div/div/div[1]/div[2]/div[${i}]/div[2]/div[2]/div`,
              ),
            )
            .getText();
          info.imageLink = driver
            .findElement(
              webdriver.By.xpath(
                `//*[@id="homeWrapper"]/section/div/div/div[1]/div/div/div[1]/div[2]/div[${i}]/div[1]/div/a/img[1]`,
              ),
            )
            .getAttribute('src');
          const data = this.contentRepository.create(info);
          this.contentRepository.save(data);
        }
      }, 17000);
    } catch (e) {
      throw e;
    }
    return this.contentRepository.find();
  }
}
