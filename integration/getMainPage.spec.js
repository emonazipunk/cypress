describe("Проверка возможности добавления платежа", () => {
  const stat_raskhodov_name = cy.faker.name.jobTitle();
  const stat_raskhodov_dscription = cy.faker.lorem.sentences(1);
  const description = cy.faker.name.firstName();
  const amount_plan = cy.faker.finance.mask(4);
  const amount_fuckt = cy.faker.finance.mask(3);
  const counter_agent_name = cy.faker.name.firstName();
  const sender_account = cy.faker.finance.mask(12);
  const recipient_account = cy.faker.finance.mask(12);
  const dayjs = require('dayjs');
  const current_date = dayjs().format('DD');
  const fuckt_date = dayjs().add(7, 'day').format('DD');

  beforeEach(() => {
    cy.login();
  });

  it("Проверка наличия кнопки добавления платежа и её работоспособности", () => {
    cy.contains("Добавить платёж").click();
    cy.url().should("include", "/payments/edit");
  });

  it("Добавление статьи расходов", () => {
    cy.get('.button__content >> .icon').click()
    cy.contains("Статьи расходов").click();
    cy.url().should("include", "/categories/");
    cy.contains("Добавить статью").click();
    cy.get('[data-field-name="title"] >>>>>>>>> .input__input').type(stat_raskhodov_name);
    cy.get('.radio-group__checkbox--last >>>> .checkbox__icon').click();
    cy.get('[data-field-name="description"] >>>>>>>>> .input__input').type(stat_raskhodov_dscription);
    cy.get('.button--state-filled > .button__content').click()
  });

  it("Проверка возможности создания платежа", () => {
    cy.contains("Добавить платёж").click();

    /** ... Тут и далее выбор множества элементов с наркоманскими селекторами,
     * писать которые люой здравомыслящий тестирощвик не будет, а просто добавит
     * уникальные uuid атрибуты к каждомому нужному элементу. XPATH и CSS селекторы
     * знать круто, но совсем не обязательно. */

    cy.get(
      '[data-field-name="operation"]>>>>>>>>>:nth-child(2)>>>>.checkbox__icon ').click();

    cy.get('[data-field-name="description"] >>>>>>>>>.input__input')
      .should("be.empty")
      .type(description);

    cy.get(".radio-group__checkbox--first >>>>>>.icon").click();

    cy.get('[data-field-name="amount_plan"] >>>>>>>>> .input__input')
      .should("be.empty")
      .type(amount_plan);

      cy.get('[data-field-name="amount_fact"] >>>>>>>>> .input__input')
      .should("be.empty")
      .type(amount_fuckt);

      cy.get('[data-field-name="status"] >>>>>>>>>:nth-child(2) >>>.checkbox__content > .checkbox__icon').click();

      cy.get('[data-field-name="date_plan"] >>>>>>>>>.date__input')
      .should("be.empty")
      .click()

      cy.get(".dp-cal").contains(current_date).click();
      
      cy.get('[data-field-name="date_fact"] >>>>>>>>>.date__input')
      .should("be.empty")
      .click()
      cy.get(".dp-cal").contains(fuckt_date).click();

      /** Статья расходов (За что) */
      cy.get('[data-field-name="category"]>>>>>>>>>>.multiselect__placeholder')
      .type(stat_raskhodov_name+'{enter}');
      cy.get('[data-field-name="category_additional_id"] >>>>>>>>> .input__input')
      .should("be.empty")
      .type(stat_raskhodov_dscription);

      /** Банковские данные */
      cy.get('[data-field-name="company_own"] >>>>>>>>>> .multiselect__placeholder').type("Магнит{downArrow}{enter}");
      cy.get('[data-field-name="company_client"] >>>>>>>>>> .multiselect__placeholder').type(counter_agent_name +"{enter}")
      // cy.get('[data-field-name="account_sender"] >>>>>>>>>>.multiselect__placeholder').type(sender_account)
      // cy.get('[data-field-name="account_recipient"]>>>>>>>>>> .multiselect__placeholder').type(recipient_account)
      cy.get('[data-field-name="tags"] >>>>>>>>>> .multiselect__placeholder').type("Лапкам" +"{enter}")
      cy.get('.widget__footer >> .button--state-filled').click()
  });
});
