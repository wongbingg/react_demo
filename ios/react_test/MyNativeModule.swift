//
//  MyNativeModule.swift
//  react_test
//
//  Created by 이원빈 on 4/15/25.
//

import Foundation
import React

@objc(MyNativeModule)
class MyNativeModule: NSObject {

  @objc
  func showToast(_ message: NSString) {
    // UIAlertController를 사용하여 iOS 네이티브에서 알림 표시
    let alert = UIAlertController(title: "Native Module", message: message as String, preferredStyle: .alert)
    
    // 알림 버튼
    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
    
    // 네이티브 모듈에서 ViewController에 알림 표시
    if let rootViewController = UIApplication.shared.keyWindow?.rootViewController {
      DispatchQueue.main.async {
        rootViewController.present(alert, animated: true, completion: nil)
      }
    }

  }

  // JS에서 호출할 수 있도록 메서드들을 노출
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
