import blobai
#blobaitest.py: unit testing for blobai

board = [0] * 49
board[0] = 1
board[48] = 1
board[6] = -1
board[42] = -1


assert blobai.comMove(board) == 1

assert [x for x in range(len(board)) if board[x]==1] == [0, 48]

assert list(blobai.passneigh(board, 0)) == [1, 2, 7, 8, 9, 14, 15, 16]

print(list(blobai.passneigh([1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, 0, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 0], 1)))

print(blobai.comMove([1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, -1, 0, 1, 1, 1, 1, 1, -1, 0, 1, -1, -1, -1, -1, -1, 0, -1, -1, 0, 0, 0, -1, 0, -1, -1, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, -1, 1]))
print(blobai.comMove([1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, -1, 0, 1, -1, -1, -1, -1, -1, 0, -1, -1, 1, 1, 1, -1, 0, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 0, -1, 0]))

print("All tests passed!")