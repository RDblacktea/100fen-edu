const books = [
  { id: 1, title: '115(上)國小套餐（安親班專用）', description: '1.國小題庫(全版本)</br>2.國小大補貼(全版本)</br>3.國小-甲.乙本(解答 全版本)', price: 3500, image: 'https://placehold.co/400x550/2b2b2b/e0e0e0?text=PDF+&font=oswald' },
  { id: 2, title: '115(上)國小套餐（家長專用）', description: '1.國小-甲.乙本(解答 全版本)</br>2..', price: 2000, image: 'https://placehold.co/400x550/2b2b2b/e0e0e0?text=PDF+&font=oswald' },
  { id: 3, title: '115(上)國小題庫（全版本）', description: '1.康軒國小:1-6年級題庫</br>2.南一國小:1-6年級題庫</br>3.翰林國小:1-6年級題庫', price: 1500, image: 'https://placehold.co/400x550/2b2b2b/e0e0e0?text=PDF+&font=oswald' },
  { id: 4, title: '115(上)國小大補帖(全版本)', description: '1.康軒國小:1-6年級(全科目)大補貼</br>2.南一國小:1-6年級(全科目)大補貼</br>3.翰林國小:1-6年級(全科目)大補貼', price: 1500, image: 'https://placehold.co/400x550/2b2b2b/e0e0e0?text=PDF+&font=oswald' },
  { id: 5, title: '115(上)國小 隱藏版校用卷', description: '1.翰林-課次卷+段考卷</br>2.康軒-單元卷+段考卷</br>3.南一-蘋果卷+段考卷', price: 1500, image: 'https://placehold.co/400x550/1e3a8a/e0e0e0?text=PDF+&font=oswald' },
  { id: 6, title: '115(上)國小 門市卷', description: '1.翰林-小無敵學習卷</br>2.康軒-新挑戰測驗卷</br>3.南一-新超群測驗卷', price: 1500, image: 'https://placehold.co/400x550/581c87/e0e0e0?text=PDF+&font=oswald' },
  { id: 7, title: '115(上)國小 英文題庫(3-6年級)', description: '1.國小 翰林-Here We GO </br>2.國小 康軒-Wonder World </br>3.國小 何嘉仁-Super Fun', price: 1500, image: 'https://placehold.co/400x550/581c87/e0e0e0?text=PDF+&font=oswald' },
  { id: 8, title: '115(上)國中套餐（補習班專用）', description: '1.</br>2.</br>3.</br>4.</br>5.</br>6.</br>7.', price: 2500, image: 'https://placehold.co/400x550/7f1d1d/e0e0e0?text=PDF+&font=oswald' },
  { id: 9, title: '115(上)國中套餐（家長專用）', description: '1.</br>2.</br>3.4', price: 2000, image: 'https://placehold.co/400x550/065f46/e0e0e0?text=PDF+&font=oswald' },
  { id: 10, title: '115(上)國中題庫(全版本)', description: '1.115(上)康軒-國中題庫(1-3年級)</br>2.115(上)翰林-國中題庫(1-3年級)</br>3.115(上)南一-國中題庫(1-3年級)', price: 1500, image: 'https://placehold.co/400x550/065f46/e0e0e0?text=PDF+&font=oswald' },
  { id: 11, title: '115(上)國中大補帖(全版本)', description: '1.115(上)康軒國中-大補貼1-3年級(全科目)</br>2.115(上)南一國中-大補貼1-3年級(全科目)</br>3.115(上)翰林國中-大補貼1-3年級(全科目)', price: 1500, image: 'https://placehold.co/400x550/b45309/e0e0e0?text=PDF+&font=oswald' },
  { id: 12, title: '115(全)國中模擬題本(全版本)', description: '<三年級專用>', price: 1200, image: 'https://placehold.co/400x550/1d4ed8/e0e0e0?text=PDF+&font=oswald' },
  { id: 13, title: '115(全)國中複習卷(全版本)', description: '<三年級專用>', price: 1200, image: 'https://placehold.co/400x550/1d4ed8/e0e0e0?text=PDF+&font=oswald' },
  { id: 14, title: '115(上)國中 門市卷(全版本)', description: '<一二年級專用>', price: 700, image: 'https://placehold.co/400x550/047857/e0e0e0?text=PDF+&font=oswald' },
  { id: 15, title: '115(上)國中 習作 數學課本解答(全版本)', description: '1.</br>2.3', price: 380, image: 'https://placehold.co/400x550/0f766e/e0e0e0?text=PDF+&font=oswald' },
  { id: 16, title: '115(上)高中英文題庫（全版本）', description: '1.龍騰英文題庫</br>2.三民英文題庫(附贈隨身碟)', price: 1500, image: 'https://placehold.co/400x550/334155/e0e0e0?text=PDF+&font=oswald' },
  { id: 17, title: '115(上)高職英文題庫（全版本）', description: '1.南一高中數學題庫</br>2.翰林高中數學題庫</br>3.三民高中數學題庫</br>4.龍騰高中數學題庫</br>5.泰宇高中數學題庫', price: 2000, image: 'https://placehold.co/400x550/334155/e0e0e0?text=PDF+&font=oswald' },
  { id: 18, title: '115(上)高職數學題庫（全版本）', description: '1.上龍騰數學題庫</br>2.東大數學題庫(附贈隨身碟)', price: 1200, image: 'https://placehold.co/400x550/334155/e0e0e0?text=PDF+&font=oswald' },
  { id: 19, title: '115(上)高職英文題庫（全版本）', description: '1.龍騰英文題庫</br>2.專大英文題庫</br>3.翰林英文題庫.', price: 1500, image: 'https://placehold.co/400x550/334155/e0e0e0?text=PDF+&font=oswald' },
  { id: 20, title: '115(上)國小翰林 英文題庫(1-2年級)', description: '1.Hooray </br>2.Twinkle', price: 1000, image: 'https://placehold.co/400x550/831843/e0e0e0?text=PDF+&font=oswald' },
  { id: 20, title: '115(上)國小康軒 英文題庫(1-2年級)', description: '1.Follow Me </br>2.Bravo ABC </br>3.Cool ABC </br>4.Super starter', price: 1500, image: 'https://placehold.co/400x550/831843/e0e0e0?text=PDF+&font=oswald' },
  { id: 20, title: '115(上)國小何嘉仁 英文題庫(1-2年級)', description: '1.Fun World </br>2.Wow! STORY </br>3.GO Magic </br>4.WS', price: 1500, image: 'https://placehold.co/400x550/831843/e0e0e0?text=PDF+&font=oswald' },
];

// Provide global access for pure HTML/JS implementation
window.books = books;
