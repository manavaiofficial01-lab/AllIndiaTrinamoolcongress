
def check_braces(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    stack = []
    
    for i, line in enumerate(lines):
        # Remove comments crudely to avoid false positives in comments
        # This is a simple parser, might fail on complex strings containing braces but unlikely in this CSS
        clean_line = ""
        in_comment = False
        j = 0
        while j < len(line):
            if not in_comment and line[j:j+2] == '/*':
                in_comment = True
                j += 2
                continue
            if in_comment and line[j:j+2] == '*/':
                in_comment = False
                j += 2
                continue
            if not in_comment:
                clean_line += line[j]
            j += 1
            
        for char in clean_line:
            if char == '{':
                stack.append(i + 1)
            elif char == '}':
                if not stack:
                    print(f"Error: Unexpected '}}' at line {i + 1}")
                    return
                stack.pop()

    if stack:
        print(f"Error: Missing '}}' for block starting at line {stack[-1]}")
    else:
        print("Braces are balanced.")

check_braces(r"d:\Project\Trinamool Congress TN - Political Portfolio Website\trinamool-congress\src\components\About\About.css")
