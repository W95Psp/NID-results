
library(ape)
library(igraph)
setwd(paste(getwd(), "./listResults/pics-gzip", sep="/"))
listValues = read.table("data.csv", header = FALSE)$V1
listFilenames = read.table("names.csv", header = FALSE)$V1
numVal = length(listFilenames)
data = matrix(data = listValues, nrow=numVal, ncol=numVal, dimnames=list(listFilenames,listFilenames))
phylo_tree = as.phylo(hclust(as.dist(data)))
graph_edges = phylo_tree$edge
graph_net = graph.edgelist(graph_edges)
l2 = as_adj_list(graph_net, mode="out")
library(RJSONIO)
write(toJSON(l2), "test.json")
