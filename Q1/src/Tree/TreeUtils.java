package Tree;

import java.util.*;

public class TreeUtils {
    public static TreeNode buildTree(Integer[] values) {
        if (values == null || values.length == 0 || values[0] == null) {
            return null;
        }

        TreeNode root = new TreeNode(values[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;

        while (i < values.length) {
            TreeNode current = queue.poll();

            if (values[i] != null) {
                assert current != null;
                current.left = new TreeNode(values[i]);
                queue.offer(current.left);
            }
            i++;

            if (i < values.length && values[i] != null) {
                assert current != null;
                current.right = new TreeNode(values[i]);
                queue.offer(current.right);
            }
            i++;
        }

        return root;
    }

    public static List<Integer> printLevelOrder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            result.add(node != null ? node.val : null);

            if (node != null) {
                queue.offer(node.left);
                queue.offer(node.right);
            }
        }

        int last = result.size() - 1;
        while (last >= 0 && result.get(last) == null) last--;

        return result.subList(0, last + 1);
    }
}

