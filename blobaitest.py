import blobai
#blobaitest.py: unit testing for blobai

board = [0] * 49
board[0] = 1
board[48] = 1
board[6] = -1
board[42] = -1

print("This is starting")
answer = blobai.comMove(board)
print(answer)