# class Point(object):
#     hello = "Hello"
#     def __init__(self, x=0, y=0):
#         self.x = x
#         self.y = y

#     def __str__(self):
#         return '({0},{1})'.format(self.x, self.y)

#     def __add__(self, other):
#         x = self.x + other.x
#         y = self.y + other.y
#         return Point(x,y)

#     def __lt__(self, other):
#         left = self.x**2 + self.y**2
#         right = other.x**2 + other.y**2
#         return left < right

# p1 = Point(2,3)
# p2 = Point(2,5)
# print(p1+p2)
# print(p1.__class__.hello + p1.hello)

# print("Great") if p1 > p2 else print("Bad")

# parent class
#

#


# class A(object):
#     @staticmethod
#     def funcname(x):
#         print(x)

#     @classmethod
#     def funcname1(cls, x):
#         print("executing class_bar(%s, %s)" % (cls, x))

#     def instance_bar(self, x):
#         print("executing instance_bar(%s, %s)" % (self, x))


# a = A()

# a.funcname("A")

# a.funcname1('duy')

# A.funcname1("duy")

# a.instance_bar('duy')

class M:
    def foo(self, i):
        print(i * 2)


class N(M):
    def foo(self, i):
        print(i + 2)


class Q(N):
    def foo(self, i):
        print(i * i)


x = Q()
Q.foo(x,3) # 9
N.foo(x,3) # 5
M.foo(x,3) # 6
x.foo(3) 

class A:
    def foo(self,i):
        print(i)

class B(A):
    def foo(self,i):
        super().foo(i * 2)

class C(A):
    def foo(self,i):
        super().foo(i + 1)

class D(A):
    def foo(self,i):
        super().foo(i * i)

class E(D,C,B):
    pass

x = E()

x.foo(3) # sở dĩ có sự khác nhau là do các foo con gọi lại foo cha còn ở ví dụ trên là print chứ không gọi foo cha