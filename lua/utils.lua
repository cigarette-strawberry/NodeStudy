local Module = {}

function Module.get_random_string(length)
    local random_string = ""
    for i = 1, length do
        random_string = random_string .. string.char(math.random(97, 122))
    end
    return random_string
end

Module.api = 'baidu.com'

return Module
