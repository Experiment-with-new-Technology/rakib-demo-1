import { element, by, ElementFinder } from 'protractor';

export class ApplicationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-application div table .btn-danger'));
  title = element.all(by.css('jhi-application div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ApplicationUpdatePage {
  pageTitle = element(by.id('jhi-application-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  versionInput = element(by.id('field_version'));

  statusSelect = element(by.id('field_status'));
  businessCategorySelect = element(by.id('field_businessCategory'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setVersionInput(version: string): Promise<void> {
    await this.versionInput.sendKeys(version);
  }

  async getVersionInput(): Promise<string> {
    return await this.versionInput.getAttribute('value');
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }

  async statusSelectOption(option: string): Promise<void> {
    await this.statusSelect.sendKeys(option);
  }

  getStatusSelect(): ElementFinder {
    return this.statusSelect;
  }

  async getStatusSelectedOption(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async businessCategorySelectLastOption(): Promise<void> {
    await this.businessCategorySelect.all(by.tagName('option')).last().click();
  }

  async businessCategorySelectOption(option: string): Promise<void> {
    await this.businessCategorySelect.sendKeys(option);
  }

  getBusinessCategorySelect(): ElementFinder {
    return this.businessCategorySelect;
  }

  async getBusinessCategorySelectedOption(): Promise<string> {
    return await this.businessCategorySelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ApplicationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-application-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-application'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
