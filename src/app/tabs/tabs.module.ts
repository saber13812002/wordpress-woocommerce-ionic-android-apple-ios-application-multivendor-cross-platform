import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsPageRoutingModule } from './tabs.router.module';
import { TranslateModule } from '@ngx-translate/core';

import { KeysPipeModule } from './../pipes/pipe.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TabsPage } from './tabs.page';
import { HomePage } from './../home/home.page';
import { CartPage } from './../cart/cart.page';
import { SearchPage } from './../search/search.page';
import { CategoriesPage } from './../categories/categories.page';
import { ProductsPage } from './../products/products.page';
import { ProductPage } from './../product/product.page';
import { ReviewPage } from './../review/review.page';
import { PostPage } from './../post/post.page';
import { ContactPage } from './../contact/contact.page';
import { AccountPage } from './../account/account.page';
import { CheckoutAddressPage } from './../checkout/address/address.page';
import { CheckoutPage } from './../checkout/checkout/checkout.page';

import { AddressPage } from './../account/address/address.page';
import { BlogPage } from './../account/blog/blog.page';
import { BlogsPage } from './../account/blogs/blogs.page';
import { EditAddressPage } from './../account/edit-address/edit-address.page';
import { ForgottenPage } from './../account/forgotten/forgotten.page';
import { LoginPage } from './../account/login/login.page';

import { MapPage } from './../account/map/map.page';
import { OrderPage } from './../account/order/order.page';
import { OrdersPage } from './../account/orders/orders.page';
import { PointsPage } from './../account/points/points.page';
import { RegisterPage } from './../account/register/register.page';
import { SettingPage } from './../account/setting/setting.page';
import { WalletPage } from './../account/wallet/wallet.page';
import { WishlistPage } from './../account/wishlist/wishlist.page';

import { EditOrderPage } from './../vendor/edit-order/edit-order.page';
import { EditProductPage } from './../vendor/edit-product/edit-product.page';
import { EditVariationPage } from './../vendor/edit-variation/edit-variation.page';
import { OrderListPage } from './../vendor/order-list/order-list.page';
import { OrderNoteListPage } from './../vendor/order-note-list/order-note-list.page';
import { ProductListPage } from './../vendor/product-list/product-list.page';
import { VendorInfoPage } from './../vendor/vendor-info/vendor-info.page';
import { VendorListPage } from './../vendor/vendor-list/vendor-list.page';
import { CategoryPage } from './../vendor/product-add/category/category.page';
import { DetailsPage } from './../vendor/product-add/details/details.page';
import { PhotosPage } from './../vendor/product-add/photos/photos.page';
import { SubcategoryPage } from './../vendor/product-add/subcategory/subcategory.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TranslateModule,
    KeysPipeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
  TabsPage,
  HomePage,
  CartPage,
  CategoriesPage,
  SearchPage,
  ProductsPage,
  ProductPage,
  ReviewPage,
  PostPage,
  ContactPage,
  AccountPage,
  CheckoutAddressPage,
  CheckoutPage,
  AddressPage,
  BlogPage,
  BlogsPage,
  EditAddressPage,
  ForgottenPage,
  LoginPage,
  MapPage,
  OrderPage,
  OrdersPage,
  PointsPage,
  RegisterPage,
  SettingPage,
  WalletPage,
  WishlistPage,

  // Vendors
  EditOrderPage,
  EditProductPage,
  EditVariationPage,
  OrderListPage,
  OrderNoteListPage,
  ProductListPage,
  VendorInfoPage,
  VendorListPage,
  CategoryPage,
  DetailsPage,
  PhotosPage,
  SubcategoryPage
  ]
})
export class TabsPageModule {}
