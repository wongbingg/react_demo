//
//  MyNativeModule.m
//  react_test
//
//  Created by 이원빈 on 4/15/25.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MyNativeModule, NSObject)
RCT_EXTERN_METHOD(showToast:(NSString *)message)
@end
