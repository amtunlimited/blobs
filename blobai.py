import math
#blobai.py: The AI backend for "Blob" using Minimax and alpha-beta pruning
#Built in functions: score = sum and finish = all

#Check to see if there's a neighbour
n = [
	-8,-7,-6,
	-1,    1,
	 6, 7, 8
]

r = [
	-1,-1,-1,
	 0,    0,
	 1, 1, 1
]

def neighbour(board, i, move):
	#top/bottom neighbour
	for data in xrange(8):
		j = n[data]
		if(i+j < 49 and i+j >= 0 and (math.trunc((i+j)/7) == math.trunc((i)/7) + r[data]) and board[i+j] == move):
			return True

	return False

#Minimax time!
#def bestMove(board, move, hist, alpha, beta, level):
def bestMove(board, move, alpha, beta, level):
	#Check if this board has been done before
	#for b in hist:
	#	if(b == board):
	#		return None
	#All checks if the board is full
	if(level > 4 or all(board)):
		#if so, return the sum for the score
		return sum(board)
	
	best = -1 * move * 49
	for i in xrange(len(board)):
		if(board[i] == 0 and neighbour(board, i, move)):
			#Make the opposing move
			board[i] = -1*move
			#answer = bestMove(board, -1 * move, hist.append(board), alpha, beta, level+1)
			answer = bestMove(board, -1 * move, alpha, beta, level+1)
			board[i] = 0
			if(answer is not None and (move * best) < (move * answer)):
				best = answer
	
	return best

#same as bestMove, but checking for the computer
def comMove(board):
	
	best = -49
	
	for i in xrange(len(board)):
		if(board[i] == 0 and neighbour(board, i, 1)):
			#Make the opposing move
			board[i] = 1
			answer = bestMove(board, -1, 0, 0, 0)
			print("The score for move {} is {}".format(i, answer))
			board[i] = 0
			if(answer is not None and best < answer):
				best = answer
				move = i
	
	return move