+ Giới thiệu ====================================================================================
# Các tiêu chi đánh giá một ngôn ngữ
    - Readability
    - Writability
    - Reliability
    - Cost
# Khác biệt giữa trình biên dịch và trình thông dịch
    - Thông dịch : dịch một lệnh một lần
    - Biên dịch: dịch toàn bộ chương trình

    - Thông dịch: tốn ít thời gian phân tích mã nguồn nhưng tổng thời gian thực thi chậm hơn
    - Biên dịch: tốn nhiều thời gian để phân tích mã nguồn nhưng tổng thời gian thực thi nhanh hơn

    - Thông dịch: không sinh ra mã trung gian (intermediate object code), do đó hiệu quả về bộ nhớ
    - Biên dịch: sinh ra các mã trung gian, tốn nhiều bộ nhớ hơn

    - Thông dịch: Tiếp tục dịch chương trình cho đến khi gặp một lỗi nào đó hoặc hết chương trình thì dừng lại. Dễ debug
    - Biên dịch: Chỉ sinh lỗi sau khi quét toàn bộ chương trình. Debug khó hơn.

    - Thông dịch: thay đổi -> dịch lại toàn bộ
    - Biên dịch: thay đổi -> chỉ thay đổi cục bộ tại chỗ thay đổi

+ Phân tích từ vựng ====================================================================================
# Vai trò
    - Là một bộ tách từ (tách một chuỗi thành tập các từ)
    - Là một bộ kiểm tra chính tả (báo lỗi chính tả)
    - Là một bộ phân lớp (xác định các thành phần, loại từ)
# Nhiệm vụ
    - Xác định các lexemes: chuỗi con của chương trình nguồn mà thuộc về một đơn vị văn phạm
    - Trả về token: loại của từ đó
    - Bỏ khoảng trắng
    - Ghi nhận vị trí của token
# Automata hữu hạn: M = (K, xichma, phi, s, F)
    - K: tập hữu hạn các trạng thái
    - xichma: tập các kí hiệu chuyển (a, b, ...)
    - s: trạng thái khởi đầu
    - F: tập các trạng thái kết thúc
    - phi: hàm chuyển từ giữa 2 trạng thái

+ Phân tích cú pháp ====================================================================================
# Văn phạm phi ngữ cảnh
    - Tập kí hiệu kết thúc T: các token mà bộ phân tích từ vựng trả qua
        = epsilon không phải là kí hiệu kết thúc, cũng không phải kí hiệu không kết thúc
    - Tập kí hiệu không kết thúc N
    - Một kí hiệu bắt đầu S thuộc N
        = Nếu không quy định rõ, ký hiệu bắt đầu của một văn phạm được quy ước là ký hiệu vế trái của luật sinh đầu tiên.
    - Một tập các luật sinh, với mới p thuộc P với form: X -> alpha (X thuộc N và alpha là một chuỗi tạo thành từ N và T)
        = Vế trái luôn có một kí hiệu và lấy từ  N 
        = Vế phải có thể có nhiều hoặc không có ký hiệu nào

    - Văn phạm phi ngữ cảnh chỉ giúp mô tả thứ tự các token, không giúp mô tả các ràng buộc kiểu, tầm vực 
# Quá trình dẫn xuất
    - Từ một tập các luật sinh, ở mỗi bước của quá trình dẫn xuất chỉ thay thế một ký hiệu không kết thúc
    - Dẫn xuất trái nhất -> luôn chọn ký hiệu không kết thúc đầu tiên từ trái qua để thay thế (phải nhất -> ngược lại)
# Parse tree
    - Quá trình parse có thể thực hiện đồng thời, không như dẫn xuất chỉ 1 lần 1 cái
# Đệ quy:
`Với BNF`:
    - Trường hợp ít nhất 1
    many: one many';
    many': seperator one many' | epsilon; 
    - Trường hợp ít nhất 0
    many: one many' | epsilon;
    many': seperator one many' | epsilon; 
    - Để không bị lỗi đệ quy trái
    exp: exp '+' term | term; // error if type exp: exp '+' term;
    Nói chung khi viết đệ quy thì phải có một chuỗi không đệ quy ở vế phải
`Chuyển EBNF về BNF`:
    - ()* a -> kết hợp phải
    - a ()* -> kết hợp trái
# Đệ quy trái:
- Định nghĩa
``
    - A0: b0 A1 a0;
    - A1: b1 A2 a1;
    - ...
    - An: bn A0 an; // gián tiếp
    hoặc
    - A: A a; // trực tiếp

- Loại bỏ đệ quy trái
``
    - a: a + a | b | c;
    ---->
    - a: b a' | c a';
    - a': + a | epsilon; // chú ý ở đâu b và c là các chuỗi kí hiệu không kết thúc hoặc kết thúc mà không bắt đầu bới a

    - s: a A | B;
    - a: a C | s D | epsilon;
    từ đây ta suy ra
    - s: a A | B;
    - a: a C | a A D | B D | epsilon;
    giải đệ quy trái ---->
    - s: a A | B;
    - a: B D aa | aa;
    - aa: C aa | A D aa | epsilon;

    - a: a - b | b;
    - b: b * c | c;
    - c: (a) | d;
    ---->
    - a: b aa;
    - aa: - b aa | epsilon';
    - b: c bb;
    - bb: * c bb | epsilon';
    - c: (a) | d;
# Left factoring:
- Định nghĩa:
``
    - Là khi không xác định được rõ ràng vế phải nào trong số các vế phải của 1 luật mà sẽ được thay thế cho vế trái trong quá trình dẫn xuất
    - Ví dụ: a: b A | b B; -> không xác định được khi dẫn xuất a bước tiếp sẽ chọn b A hay b B
- Tổng quát:
``
    - A: a b1 | a b2 | ... | a bn | c
    ---->
    - A: a AA | c;
    - AA: b1 | b2 | ... | bn;
- Giải quyết if..else:
``
    stmt : IF expr THEN { stmt } ELSE { stmt }
        | IF expr THEN { stmt }
        | other
    expr : TRUE | FALSE
    ----->
    stmt: IF expr THEN { stmt } AA | other
    AA: ELSE { stmt } | epsilon;
    expr : TRUE | FALSE
# Kết hợp
    - Kết hợp trái: exp: exp addop term | term; -> thành phần đệ quy nằm bên trái
    - Kết hợp phải: exp: term addop exp | term; -> thành phần đệ quy nằm bên phải
        = lưu ý ở 2 cái trên thì phải có phần '| term' để không bị lỗi đệ quy trái
    - Không kết hợp: exp: term addop term; -> không có thành phần đệ quy
# Nhập nhằng:
    - Khi có thể tìm được một chuỗi nào đó thuộc ngôn ngữ mà có >= 2 dẫn xuất trái nhất biểu diễn chuỗi đó
    - S: SA | A; A: Aa | b; -> không nhập nhằng
    - S: SA | A; A: Aa | a; -> nhập nhằng

    - A -> A+A | A-A | A*A | a; // nhập nhằng
    - A -> A+a | A-a | a; // không nhập nhằng

    - Khử nhập nhằng trong If..else
    stmt: matchStmt | unmatchStmt;
    matchStmt: if exp then matchStmt else matchStmt;
    unmatchStmt: if exp then stmt 
                | if exp then matchStmt else unmatchStmt;
# Độ ưu tiên:
    - prior1: prior1 addop prior2 | prior2;
    - prior2: prior2 mulop prior3 | prior3;
    ...
    => ý tưởng là sao cho khi sinh ra parse tree, các phép toán có độ ưu tiên thấp sẽ ở gần root hơn các phép toán ưu tiên hơn
    
    - Trong ANTLR, ta có thể nhóm hết vào một rule phân cách bởi dấu '|', độ ưu tiên cao được thể hiện trước, kết hợp phải thì thêm tiền tố <assoc=right>

+ Lập trình hướng đối tượng ====================================================================================
`Python`:
    - thuộc tính privite: __c chứ không phải private c hay _c
    - có 3 loại phương thức (method) trong python: instance, class và static
        = instance method là phổ biến nhất, được truyền mặc định một tham số là self, khi gọi phải gọi thông qua một instance của class đó (a = A() \n a.foo())
        = class method là phương thức thuộc về cả class, được truyền mặc định một tham số là cls, có thể gọi thông qua class hoặc instance (một số ngôn ngữ sẽ báo warning nếu dùng instance để gọi class method, Python thì không @@)
    - vẫn có thể gọi instance method thông qua class bằng cách truyền vào lời gọi hàm tham số thứ nhất là 1 instance của class
`Một số đặc điểm đáng chúy ý`
    - Abstract data type
        = Bao đóng
        = Ẩn chi tiết
    - Lớp phân cấp
    - Kế thừa
    - Đa hình - dynamic binding

`Phân biệt class vs. object, method vs. message`
    - Class vs. object <=> A dog has fur and is able to bark vs. DucHoang is a dog
    - Method vs. message <=> A dog can bark vs. DucHoang bark

`C3 Algorithm`
# Quy ước
    - L[object] = [object]
    - L[C(B1 ... Bn)] = [C] + merge(L[B1], ..., L[Bn], [B1, ... , Bn])
    - L[C(B)] = [C] + merge(L[B],[B]) = C + L[B]
    => the linearization of C is the sum of C plus the merge of the linearizations of the parents and the list of the parents.
# Giải thuật
    - Xét L[B1][0]
        = nếu head của nó không là tail của bất cứ list nào khác trong các list còn lại (L[B1] ... L[Bn]) thì
        L[C(B1, ..., Bn)] = [C] + L[B1][0] + merge(L[B1][1:], ..., L[Bn], [B1, ..., Bn])
        = ngược lại, xét L[B2][0]
    - Lặp tới khi không tìm được head nào phù hợp hoặc tất cả các list trong merge() được triệt tiêu hết

`Phương thức`
    - Một thông điệp thực thể có thể tương ứng với nhiều phương thức khác nhau tuỳ theo thực thể nhận thông điệp thuộc lớp nào
    - Một thông điêp lớp (class message) chỉ tương ứng với duy nhất một phương thức (method)

`Quan hệ cha con`
    - Với các ngôn ngữ biên dịch (Scala), 
        = việc gán con cho cha (cha = con) là hợp lệ trong khi điều ngược lại (con = cha) thì không
        = việc khởi tạo biến kiểu cha với kiểu của con (A a = new B()) là không hợp lệ trong khi điều ngược lại thì được (B b = new A())

    - Với các ngôn ngữ thông dịch (Python), 
        = việc gán nào cũng được chấp nhận và chỉ kiểm tra tại thời điểm thực thi
        = việc khởi tạo nào cũng được chấp nhận và chỉ kiểm tra tại thời điểm thực thi. nếu a gọi một phương thức hay thuộc tính mà B không có thì mới báo lỗi

+ Functional Programming ====================================================================================
`list(map(function, iterable)) <=> [function(x) for x in iterable]`
    - hàm map trả vệ một generator object (map object)
    - khi muốn truyền nhiều hàm iterable vào cùng lúc thì
        = nếu biết chính xác số iterable truyền vào thì function phải có khai báo nhậnvừa  đúng số tham số đó
        = nếu chưa biết chính xác, ở khai báo function, ta sử dụng tham số *args

`Flatten`
    - Flatten một list gồm các list (100% là list)
    flatten_list = [x for sublist in complex_list for x in sublist]
    flatten_list = sum(complex_list, [])
    flatten_list = reduce(lambda x,y: x+y, complex_list)
    - Flatten một list gồm các list và số nguyên
    def flatten(lst):
        return sum(([x] if not isinstance(x, list) else flatten(x) for x in lst), [])
    flatten_list = flatten(complex_list)

`reduce(function, iterable, initializer)`
# reduce(lambda x, y: x+y, [1,2,3]) <=> add(add(1,2),3)
# reduce(lambda x, y: x+y, [1,2,3],5) <=> add(add(add(5,1),2),3)

# reduce(lambda x,y: x*y if isinstance(y,int) else x, lst,1)
    - y sẽ được duyệt lần lượt
    - x là cái được gọi đệ quy, giá trị khởi tạo của x ở đây là 1, x cũng là giá trị sẽ trả về
    - như vậy nếu y không phải kiểu int thì tích x giữ nguyên

`list(filter(function, iterable)) <=> [x for x in iterable if function(x)]`
    - hàm filter trả về một generator object (filter object)
    - list(filter(None, [1,0,2,[],'','a'])) <=> [x for x in [1,0,2,[],'','a'] if x] <=> [1,2,'a']

`list comprehension`
    [exp for x in iterable if condition]
    [exp if condition else stmt for x in iterable]

`lambda function: lambda params: function`
# s = lambda x: x*x
# s(2) -> 4

`zip(*iterable)`
# a = [1,2,3]
# b = [4,5]
# c = [7,8,9,10]
# d = zip(a,b,c) -> [(1,4,7),(2,5,8)] dùng list(d) để hiển thị
# e,f = zip(a,b,c) -> e = [1,4,7]     f = [2,5,8]
# g,h,i = zip(a,b,c) -> error @@

`high-order function`
def A(x):
    def B(y):
        return x+y
    return B
<=>
class Add(object):
    def __init__(self,x):
        self.x = x
    def __call__(self,y):
        return self.x + y

a = A(5)
b = a(2) # b = 5 + 2 = 7

c = Add(5)
d = c(2) # d = 5 + 2 = 7

+ AST ======================
Parse rule trong file .g4 ở dạng EBNF:
`Kết hợp trái`
operand = ctx.a()
operator = ctx.b()
combine = zip(operatorm, operand[1:])
return reduce(lambda x,y: Binary(y[0].getText(), x, self.visit(y[1])), combine, self.visit(operand[0]))

`Kết hợp phải`
operand = ctx.a()[::-1]
operator = ctx.b()[::-1]
combine = zip(operator, operand[1:])
return reduce(lambda x,y: Binary(y[0].getText(), self.visit(y[1]), x), combine, self.visit(operand[0]))

`Vui vui`
# ANTLR:
    arraytype:  arraytype dimen | primtype dimen;

    mptype: primtype | arraytype;

    primtype: INTTYPE | FLOATTYPE; 

    dimens: dimen+;

# Python:
    def visitMptype(self,ctx:MPParser.MptypeContext):
        if ctx.primtype():
            return self.visit(ctx.primtype()) 
        else:
            arr = self.visit(ctx.arraytype())
            return ArrayType(arr[0],arr[1])

    def visitArraytype(self,ctx:MPParser.ArraytypeContext):
        if ctx.arraytype():
            arr = self.visit(ctx.arraytype())
            return UnionType(arr[0],self.visit(ctx.dimen())),arr[1]
        else:
            return self.visit(ctx.dimen()),self.visit(ctx.primtype())