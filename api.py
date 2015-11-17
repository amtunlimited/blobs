#api.py: a Web.py interface to the blobs AI functionality

import web
import blobsai

#This decides what class to use based on regular expressions
urls = (
	#'/blobs/api.py/win/(.*)','win',
	'/blobs/api.py/move/(.*)','move'
)


'''
class win:
	"""The 'win' class is requested when checking a current board for a win state."""
	def GET(self, boardst):
		board = tttai.conv(boardst)
		
		#This means the computer won
		if(tttai.score(board) == 10):
			return 'x'
		#This means the player won
		elif(tttai.score(board) == -10):
			return 'o'
		#This means that the board is full and no one won
		elif(tttai.tie(board)):
			return 't'
		
		#This means none of the other stuff happened
		return 0
'''

class move:
	"""The 'move' class simply feeds the baord into the 'comMove' function"""
	def GET(self,board):	
		return blobai.comMove(blobai.conv(board))

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()