import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
// libs
import { AppBaseComponent, AppService } from '@erp/nativescript';
import { isAndroid } from 'tns-core-modules/platform';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { DataLoadingService } from '@erp/core/services/data.loading.service';
import { LoadingIndicatorServiceModel } from '@erp/core/services/data.loading.service';
import { WindowService } from '@erp/core';
import { isIOS } from '@erp/utils';

@Component({
  selector: 'xpl-root',
  template: `
    <ActionBar title="ERP by NašeÚkoly.CZ">
      <NavigationButton icon="font://&#xf0c9;" class="fa-16" (tap)="showHideSideDrawer()" *ngIf="onAndroid"></NavigationButton>
      <ActionItem icon="font://&#xf0c9;" class="fa" ios.position="left" (tap)="showHideSideDrawer()" *ngIf="!onAndroid"></ActionItem>
      <ActionItem icon="font://&#xf013;" class="fa" ios.position="right" (tap)="openSettings()"></ActionItem>
    </ActionBar>
    <RadSideDrawer tkExampleTitle tkToggleNavButton>
      <GridLayout tkDrawerContent rows="56, *" class="sideStackLayout">
        <StackLayout class="sideTitleStackLayout">
          <Label text="Navigation Menu"></Label>
        </StackLayout>
        <ScrollView row="1">
          <StackLayout class="sideStackLayout">
            <Button text="Home" [nsRouterLink]="['/home']" pageTransition="slide" class="sideLabel"></Button>
            <Label text="Primary" class="sideLabel sideLightGrayLabel"></Label>
            <Label text="Social" class="sideLabel"></Label>
            <Label text="Promotions" class="sideLabel"></Label>
            <Label text="Labels" class="sideLabel sideLightGrayLabel"></Label>
            <Label text="Important" class="sideLabel"></Label>
            <Label text="Starred" class="sideLabel"></Label>
            <Label text="Sent Mail" class="sideLabel"></Label>
            <Label text="Drafts" class="sideLabel"></Label>
            <Label text="Close Drawer" color="lightgray" padding="10" style="horizontal-align: center" (tap)="onCloseDrawerTap()"></Label>
          </StackLayout>
        </ScrollView>
      </GridLayout>
      <StackLayout tkMainContent>
        <ActivityIndicator width="100" height="100" [busy]="loading" visibility="{{ loading ? 'visible' : 'collapsed' }}"></ActivityIndicator>
        <page-router-outlet actionBarVisibility="never"></page-router-outlet>
      </StackLayout>
    </RadSideDrawer>
  `
})
export class AppComponent extends AppBaseComponent implements AfterViewInit, LoadingIndicatorServiceModel {
  onAndroid: boolean;
  drawerShown: boolean;
  @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;
  loading = false;
  hide() {
    this.loading = false
  }

  show() {
    this.loading = true
  }

  constructor(
    appService: AppService,
    private routerExtensions: RouterExtensions,
    dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) {
    super(appService);
    this.onAndroid = isAndroid;
    this.drawerShown = false;
    dataLoadingService.setLoadingIndicator(this);
    windowService.isIOS = isIOS();
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  showHideSideDrawer() {
    if (this.drawerShown) this.drawer.closeDrawer();
    else this.drawer.showDrawer();

    this.drawerShown = !this.drawerShown;
  }

  onCloseDrawerTap() {
    this.drawerShown = false;
    this.drawer.closeDrawer();
  }

  openSettings() {
    // implement the custom logic
    console.log(`*** open settings`);
  }
}
