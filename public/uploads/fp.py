import operator
from functools import reduce

# a=[1,2,3]
# b=[5,6]

# def some(*args):
#     return list(args)

# c= list(map(some, a,b))

# cc = [[1,2],3,[4]]

# d = [x for sub in c for x in sub]

# e = reduce(lambda x,y: x+y,c)

# f = sum(c,[])

# def flatten(lst):
#     return sum(([x] if not isinstance(x, list) else flatten(x) for x in lst), [])

# print(c)

# print(d)

# print(e)

# print(f)

# print(flatten(cc))

# d = [1, 2, 3, 4]

# a = reduce(lambda x, y: x+y, d, 4)
# print(a)
# print(d[0])


# def multiply(s1, s2):
#     print('{arg1} * {arg2} = {res}'.format(arg1=s1,arg2=s2,res=s1*s2))
#     return s1 * s2
# asequence = [1, 2, 3]

# print(reduce(multiply,asequence))

# a = [1,2,3,4,5]

# print(a[4:2:-1])
# print(a[1:3])

# a = 'apple'

# print([x for x in a if x in 'ueoai'])
# print([x if x in 'ueoai' else 'x 'for x in a ])

# def compose(*g):
#     def h(args):
#         return reduce(lambda x, y: y(x), reversed(g), args)
#     return h

# def compose1(*g):
#     def h(args):
#         return reduce(lambda x, y: y(x), g, args)
#     return h


# def square(x):
#    return x * x


# def increase(x):
#    return x + 1


# def double(x):
#    return x * 2


# m = compose(square, increase, double)
# print(m(5))

# n = compose1(double, increase, square)
# print(n(5))

# lst = [1,2,3,4,5]

# print(reduce(lambda x,y: str(y)+str(x),lst)) # 54321
# print(reduce(lambda x,y: str(x)+str(y),lst)) # 12345

# def f(x):
#     def g(y):
#         return y**x
#     return g

# a = f(2) # set x = 2
# print(a(3)) # g(3) = 9
# b = f(3) # set x = 3
# print(b(2)) # g(2) = 8

# def dist(x,y):
#     #return list(map(lambda i: (x,i),y))
#     return [(x,i) for i in y]

# print(dist(2,[3,4,5]))

def lstSquare(n):
    return lstSquare(n-1) + [n**2] if n != 1 else [1]

print(lstSquare(5))

def lstSquare2(n):
    return list(map(lambda x: x**2,range(1,n+1)))

print(lstSquare2(5))

def poww(x,n):
    return x*poww(x,n-1) if n>0 else 1

print(poww(2,3))

def poww2(x,n):
    # [x]*4 = [x,x,x,x]
    return reduce(lambda a,b: a*b,[x]*n)

print(poww2(2,3))

def appendd(a,b):
    return appendd(a+[b[0]],b[1:]) if len(b)>0 else a

print(appendd([1,2],[3]))

def appendd1(a,b):
    return [x for sublist in map(lambda x: a + [x],b) for x in sublist]

print(appendd1([1,2],[3]))

def reversee(lst):
    return [lst[len(lst)-1]] + reversee(lst[:-1]) if len(lst) != 0 else []

print(reversee([4,5,6]))

def reversee1(lst):
    return reduce(lambda x,y: [y]+x ,lst,[])

print(reversee1([4,5,6]))

def lessThan(n,lst):
    if len(lst) == 0:
        return []
    else:
        return [lst[0]] + lessThan(n,lst[1:]) if lst[0]<n else lessThan(n, lst[1:])

print(lessThan(50,[1,55,6,2]))

def lessThan1(n, lst):
    return list(filter(lambda x: x<n,lst))

print(lessThan1(50,[1,55,6,2]))

def multii(lst):
    return reduce(lambda x,y: x*y if isinstance(y,int) else x, lst,1)

print(multii([1.5,2,'b','cd',3]))

a = [1.5,2,'b','cd',3]

[print(x) for x in a if isinstance(x,int)]

def ham(lst,a):
    