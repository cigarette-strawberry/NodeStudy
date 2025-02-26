local utils = require('./utils')

local u = utils.get_random_string(5)
print('u', u)
print('u', utils.api)

a = 354665
-- a = '111'
print('a', a)

do
    local b = 3
end
print('b', b)

local c = 4
local c = '5'
local c = '5'
local c = true
local c = nil
print('c', c)

local d = {1, 2, 3, 4, 5}
print('d', d)

local e = {
    a = 1,
    b = 2,
    c = 3
}
print('e', e)
print('e', e.a, e.b, e.c)

function func(val)
    if val == 2 then
        print(val == 2)
        return val
    elseif val == 3 then
        print(val == 3)
        return val
    else
        print('any')
        return val
    end
end
local f = func(a)
print('f', f)

-- do 前面是一个 步进
for i = 1, 10, 3 do
    print('i', i)
end

local arr = {10, 20, 30, 40, 50}
print('arr', arr[0])
for i, v in ipairs(arr) do
    print('i', i, 'v', v)
end

-- 随机顺序打印key
local obj = {
    name = 'cigarette',
    age = 20
}
for i, v in pairs(obj) do
    print('i', i, 'v', v)
end

local file = io.open('./index.txt', 'w')
file:write('hello world')

local file = io.open('./index.txt', 'r')
local content = file:read('*a')
print('content', content)

