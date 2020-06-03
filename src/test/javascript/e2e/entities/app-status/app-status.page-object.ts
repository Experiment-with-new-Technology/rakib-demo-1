import { element, by, ElementFinder } from 'protractor';

export class AppStatusComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-app-status div table .btn-danger'));
  title = element.all(by.css('jhi-app-status div h2#page-heading span')).first();
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

export class AppStatusUpdatePage {
  pageTitle = element(by.id('jhi-app-status-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  statusInput = element(by.id('field_status'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStatusInput(status: string): Promise<void> {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput(): Promise<string> {
    return await this.statusInput.getAttribute('value');
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

export class AppStatusDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appStatus-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appStatus'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
