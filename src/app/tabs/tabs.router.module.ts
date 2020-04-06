import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from './../home/home.page';
import { CartPage } from './../cart/cart.page';
import { CategoriesPage } from './../categories/categories.page';
import { SearchPage } from './../search/search.page';
import { ProductsPage } from './../products/products.page';
import { ProductPage } from './../product/product.page';
import { ReviewPage } from './../review/review.page';
import { PostPage } from './../post/post.page';
//import { ContactPage } from './../contact/contact.page';
import { AccountPage } from './../account/account.page';
import { CheckoutAddressPage } from './../checkout/address/address.page';
import { CheckoutPage } from './../checkout/checkout/checkout.page';
import { OrderSummaryPage } from './../checkout/order-summary/order-summary.page';

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

//Vendor
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

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            component: HomePage,
          },
          {
            path: 'products/:id',
            children: [
              {
                path: '',
                component: ProductsPage
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    component: ProductPage
                  },
                  {
                    path: 'review/:id',
                    component: ReviewPage
                  }
                ]
              }
            ]
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                component: ProductPage
              },
              {
                path: 'review/:id',
                component: ReviewPage
              }
            ]
          },
          {
            path: 'vendor-products',
            children: [
              {
                path: '',
                component: ProductsPage
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    component: ProductPage
                  },
                  {
                    path: 'review/:id',
                    component: ReviewPage
                  }
                ]
              }
            ]
          },
          {
            path: 'post/:id',
            component: PostPage
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            component: CategoriesPage
          },
          {
            path: 'products/:id',
            children: [
              {
                path: '',
                component: ProductsPage
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    component: ProductPage
                  },
                  {
                    path: 'review/:id',
                    component: ReviewPage
                  }
                ]
              }
            ]
          },
          {
            path: 'vendor-products',
            children: [
              {
                path: '',
                component: ProductsPage
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    component: ProductPage
                  },
                  {
                    path: 'review/:id',
                    component: ReviewPage
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            component: SearchPage
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                component: ProductPage
              },
              {
                path: 'review/:id',
                component: ReviewPage
              }
            ]
          },
          {
            path: 'vendor-products',
            children: [
              {
                path: '',
                component: ProductsPage
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    component: ProductsPage
                  },
                  {
                    path: 'review/:id',
                    component: ReviewPage
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            component: CartPage
          },
          {
            path: 'address',
            component: CheckoutAddressPage
          },
          {
            path: 'checkout',
            component: CheckoutPage
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                component: ProductPage
              },
              {
                path: 'review/:id',
                component: ReviewPage
              }
            ]
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            component: AccountPage
          },
          {
            path: 'address',
            children: [
              {
                path: '',
                component: AddressPage
              },
              {
                path: 'edit-address',
                component:EditAddressPage
              }
            ]
          },
          {
          path: 'register',
            component: RegisterPage
          },
          {
          path: 'points',
            component: PointsPage
          },
          {
            path: 'setting',
            component: SettingPage
          },
          {
            path: 'wallet',
            children: [
              {
                path: '',
                component: WalletPage
              },
              {
                path: 'cart',
                component: CartPage
              }
            ]
          },
          {
            path: 'post/:id',
            component: PostPage
          },
          {
            path: 'map',
            component: MapPage
          },
          {
            path: 'orders',
            children: [
              {
                path: '',
                component: OrdersPage
              },
              {
                path: 'order/:id',
                component: OrderPage
              }
            ]
          },
          {
            path: 'login',
            children: [
              {
                path: '',
                component: LoginPage
              },
              {
                path: 'forgotten',
                component: ForgottenPage
              }
            ]
          },
          {
            path: 'wishlist',
            children: [
              {
                path: '',
                component: WishlistPage
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    component: ProductPage
                  },
                  {
                    path: 'review/:id',
                    component: ReviewPage
                  }
                ]
              }
            ]
          },
          {
            path: 'blogs',
            children: [
              {
                path: '',
                component: BlogsPage
              },
              {
                path: 'blog/:id',
                component: BlogPage
              }
            ]
          },
          {
            path: 'vendor-orders',
            children: [
                {
                  path: '',
                  component: OrderListPage
                },
                {
                  path: 'edit-order/:id',
                  component: EditOrderPage
                },
                {
                  path: 'view-order/:id',
                  component: OrderPage
                }
              ]
          },
          {
            path: 'vendor-products',
            children: [
                {
                  path: '',
                  component: ProductListPage
                },
                {
                  path: 'edit-product/:id',
                  children: [
                    {
                      path: '',
                      component: EditProductPage
                    },
                    {
                      path: 'edit-variation-product/:id',
                      component: EditVariationPage
                    }
                  ]
                },
                {
                  path: 'view-product/:id',
                  component: ProductPage
                }
              ]
          },

          {
            path: 'add-products',
            children: [
                {
                  path: '',
                  component: CategoryPage
                },
                {
                  path: 'subcategory/:id',
                  component: SubcategoryPage
                },
                {
                  path: 'details/:id',
                   children: [
                    {
                      path: '',
                      component: DetailsPage
                    },
                    {
                      path: 'photos',
                      component: PointsPage
                    }
                  ]
                }
              ]
          },
        ]
      },


      {
        path: 'vendor',
        children: [
          {
            path: '',
            component: VendorListPage
          },
          {
            path: 'vendor-info/:id',
            component: VendorInfoPage
          },
          {
            path: 'products',
            children: [
              {
                path: '',
                component: ProductsPage
              }, 
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    component: ProductPage
                  },
                  {
                    path: 'review/:id',
                    component: ReviewPage
                  }
                ]
              }
            ]
          },
          {
            path: 'vendor-products',
            children: [
              {
                path: '',
                component: ProductsPage
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    component: ProductsPage
                  },
                  {
                    path: 'review/:id',
                    component: ReviewPage
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
